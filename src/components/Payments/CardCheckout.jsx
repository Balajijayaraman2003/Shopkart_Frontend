import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51SJ9wO9RcDF7M5cOfql85eLhX82M4ZeLskoQtqH377jExYgH0Hrs5MHG3Z2NRzslSrgyneOiUuwAoJkgWCSbAGMi00owlo076s');

function StripeForm({ orderData }) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { order_id } = orderData


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,

      confirmParams: {
      },
      redirect: "if_required"
    });

    if (error) {
      navigate('/payment-failure', {
        state: { error: error },
      });
    } else if (paymentIntent?.status === 'succeeded') {
      navigate(`/payment-success/?order_id=${order_id}`, {
        state: { order_id }
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: 'accordion' }} />
      <Button className='my-3 w-100 fw-bold' type="submit" disabled={!stripe}>Pay</Button>
    </Form>
  );
}

function CardCheckout({ order_data }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [intentCreated, setIntentCreated] = useState(false);
  const userData = useSelector(state => state.user);
  useEffect(() => {
    if (intentCreated || !userData?.user_id || !order_data?.order_id) return;

    axios.post('https://siphonophorous-tamatha-prehistoric.ngrok-free.dev/payment/pay/', {
      amount: order_data.amount * 100,
      currency: 'usd',
      user_id: userData.user_id,
      order_id: order_data.order_id,
    })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
        setIntentCreated(true);
      })
      .catch(err => {
        console.error('Error creating payment intent:', err);
      });
  }, [userData, order_data, intentCreated]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };


  return (
    <div className='m-3'>
      <h5 className='my-3'>Product Detials</h5>
      <div>
        {
          order_data.products && order_data.products.map((item,index) => {
            return <Card key={index}>
              <Row>
                <Col xs={4}>
                  <Card.Img src={item.product.image.image} />
                </Col>
                <Col xs={8}>
                <Card.Text>
                  {item.product.name}
                </Card.Text>
                <Card.Text>
                  
                </Card.Text>
                </Col>
              </Row>
            </Card>
          })
        }

      </div>
      <h5 className='my-3'>Select Payment Method</h5>
      {!clientSecret ? (
        <p>Loading payment form...</p>
      ) : (
        <Elements stripe={stripePromise} options={options}>
          <StripeForm orderData={order_data} />
        </Elements>
      )}
    </div>
  );
}

export default CardCheckout;