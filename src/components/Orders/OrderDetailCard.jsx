import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Card, Col, Container, Row } from 'react-bootstrap';

import Backdrop from "@mui/material/Backdrop";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Form from 'react-bootstrap/Form';
import OrderDetailSkeleton from '../skelleton/OrderDetailSkeleton';

function OrderDetailCard() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(0);
  const [review, setReview] = useState({
    review: "",
    rating: 0,
    image: ""
  });

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const steps = [
    'Order Placed',
    'Ready For Shipping',
    'Shipped',
    'Out For Delivery',
    'Delivered'
  ];

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/order/order-details/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        setData(response.data);
        setLoading(false)
      });
  }, [id]);

  if (!data || !data.products) return null;

  const { product, quantity } = data.products[0];
  const { payment_details } = data

  const statusMap = {
    "pending": 0,
    "Order Placed": 1,
    "Ready For Shipping": 2,
    "Shipped": 3,
    "Out For Delivery": 4,
    "Delivered": 5,
    "Cancelled": 6
  };
  const status_code = statusMap[data.status] ?? 0;


  function handleChange(e) {
    const { name, value, files } = e.target;
    setReview(prev => ({
      ...prev,
      product: product.id,
      [name]: files ? files[0] : value   // handle file input correctly
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(review)
    axios.post(`http://127.0.0.1:8000/app/reviews/`, review, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data"
      }
    }).then((response) => {
      console.log(response.data)
    })
      .catch((err) => {
        console.log(err)
      })
    handleClose()
  }
  if (loading) {
    return <OrderDetailSkeleton />
  }
  return (
    <Container>
      <Card className='py-3 px-2'>
        <Row>
          <Col md={4} className='d-flex justify-content-center align-items-center border-end'>
            <Card.Img
              src={`http://localhost:8000/${product?.image?.image}`}
              style={{ maxHeight: "400px", width: "auto" }}
              className='img-fluid'
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className='display-5 fw-bold  my-3'>{product.name}</Card.Title>
              <Card.Text className='fs-3 fw-bold'>Quantity : {quantity}</Card.Text>
              <Card.Text className='fs-3'><span className='fw-bold'>Price : </span> {data.amount}</Card.Text>
              <Card.Text className='lead fw-bold'>Order Status</Card.Text>
              <Card.Text style={{ width: "100%" }}>
                <Box sx={{ width: "100%" }}>
                  <Stepper activeStep={status_code} alternativeLabel>
                    {steps.map((label, index) => (
                      <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
                <hr />
                <Card.Text className='display-5'>Order Details</Card.Text>
                <table className='table'>
                  <tbody>
                    <tr>
                      <th>Order Id</th>
                      <td>{data.order_id}</td>
                    </tr>
                    <tr>
                      <th>Order status</th>
                      <td>{data.status}</td>
                    </tr>
                    <tr>
                      <th>Payment Id</th>
                      <td>{payment_details.payment_id}</td>
                    </tr>
                    <tr>
                      <th>Payment Method</th>
                      <td>{payment_details.payment_method}</td>
                    </tr>
                    <tr>
                      <th>Payment Status</th>
                      <td>{payment_details.status}</td>
                    </tr>
                    <tr>
                      <th>Date & Time</th>
                      <td>{payment_details.updated_at}</td>
                    </tr>

                  </tbody>
                </table>
              </Card.Text>
            </Card.Body>

            {/* Review Modal */}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{ backdrop: { timeout: 500 } }}

            >
              <Fade in={open}>
                <Box sx={style} style={{ background: "aliceblue" }} className="w-75">
                  <Form method="post" onSubmit={handleSubmit}>
                    <Card.Text className='display-6'>Add Your Ratings & Review Of The Product</Card.Text>
                    <span>
                      <Card.Text className='fw-bold'>Rating Of The Product</Card.Text>
                      <Rating
                        name="rating"
                        style={{ padding: "5px" }}
                        size='medium'
                        onChange={(e, newValue) =>
                          setReview(prev => ({ ...prev, rating: newValue }))
                        }
                      />
                    </span>
                    <Card.Text className='fw-bold'>Review Of The Product</Card.Text>
                    <TextareaAutosize
                      variant="outlined"
                      label="Review"
                      style={{ width: "100%", height: "50%", padding: "10px" }}
                      name='review'
                      onChange={handleChange}
                    />
                    <Form.Control
                      type='file'
                      className='m-2'
                      name="image"
                      onChange={handleChange}
                    />
                    <div className="btn-container d-flex justify-content-end m-2">
                      <Button variant='contained' className='mx-3' type='submit'>Add Review</Button>
                      <Button variant='contained' color="error" onClick={handleClose}>Close</Button>
                    </div>
                  </Form>
                </Box>
              </Fade>
            </Modal>

            {data.status === "Delivered" && (
              <Button className='w-100' variant="contained" color="primary" onClick={handleOpen}>
                Add Review
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default OrderDetailCard;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};