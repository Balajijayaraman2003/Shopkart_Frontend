import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BsCartPlus } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";
import axios from 'axios'
import ReviewCard from './ReviewCard';
import MiniProductCard from './MiniProductCard';
import Rating from '@mui/material/Rating';
import ProductDetailsSkeleton from '../skelleton/ProductDetailsSkeleton';
// MUI

function AddToCart(data,quantity) {
  let product = data.id
  const token = localStorage.getItem("access_token");

  axios.post(
    "http://127.0.0.1:8000/app/cart/",
    {
      product: data.id,
      quantity: quantity
    }, // <-- this is the request body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      alert("Item added to cart successfully!");
      console.log(response.data); // better to log response.data
    })
    .catch((err) => {
      console.error("Error adding to cart:", err);
    });
}

function ProductDetailsCard({ data }) {
  let navigate = useNavigate()
  let [loading, setLoading] = useState(true)
  function handleProductOrder(e) {
    navigate("/products/order", { state: { product: data, quantity: value } })
  }
  const [value, setValue] = useState(1)
  const [related, setRelated] = useState([])
  const [reviews, setReviews] = useState([])
  const increment = () => setValue((value + 1))
  const decrement = () => setValue(() => {
    if (value <= 1)
      setValue(1)
    else {
      setValue(value - 1)
    }
  })
  const handleChange = (e) => {
    let value = e.target.value
    setValue(value)
  }
  // Related Products
  useEffect(() => {
    if (!data?.id) return;

    const controller = new AbortController();

    const fetchRelated = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/app/products/similar/${data.code}`,
          { signal: controller.signal }
        );
        setRelated(response.data.results);
        setLoading(false)
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Error fetching related:", err.message);
        }
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/app/reviews/${data.code}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            signal: controller.signal,
          }
        );
        setReviews(response.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Error fetching reviews:", err.message);
        }
      }
    };

    fetchRelated();
    fetchReviews();
    window.scrollTo(0, 0);
    return () => controller.abort();

  }, [data]);
  if (loading) {
    return <ProductDetailsSkeleton />
  }

  console.log(reviews)
  return (
    <div>
      <div>

      </div>
      <Container>
        <Card className='p-3'>
          <Row g={2}>
            <Col md={4} className='border-end'>
              <div className="img-container d-flex align-items-center justify-content-center">
                {
                  data.image && <Card.Img src={data.image.image} style={{ height: "400px", width: "auto" }} className='img-fluid' />
                }
              </div>
            </Col>

            <Col md={8} className='ps-4'>
              <Card.Body>
                <Col md={8}>
                  <Card.Title className='display-6 fw-bold'>{data.name}</Card.Title>
                  <Card.Text className='d-flex'>
                    {data.tags && data.tags.map((item) => (
                      <Badge key={item.name} className="me-2 p-2" bg={item.variant}>
                        {item.name}
                      </Badge>
                    ))}
                  </Card.Text>

                  <Card.Text>{data.short_description}</Card.Text>
                  <Card.Text className='d-flex align-items-center'>
                    <span className='me-1'>{data.rating}</span> <Rating
                      name="half-rating-read"
                      value={Math.round(data.rating * 2) / 2}   // backend rating
                      precision={0.5}
                      readOnly
                    />
                    <span className='mx-2'>({data.rating_count} reviews)</span>


                  </Card.Text>
                  <Card.Text>
                    <span className='text-danger fs-4 me-3'>{data.discount_percent}%</span>
                    <span>
                      &#8377; <s className='text-danger'>{data.old_price}</s>
                    </span >
                    <span className='px-3'>
                      &#8377; <span className='fs-4'>{data.selling_price}</span> Only.
                    </span>
                  </Card.Text>
                  <Card.Text className='py-3'>Available Payment Options : Card,Upi,Emi,Wallet,Pay On Delivary</Card.Text>
                </Col>
                <Col md={3}>
                  <div className="quantity d-flex align-items-center my-3 md-justify-content-center w-100">
                    <button className='btn btn-danger' onClick={decrement} style={{ height: "40px", width: "auto" }}>-</button>
                    <input className='text-center' type="text" name="quantity" value={value} style={{ width: "100px", height: "40px" }} onChange={handleChange} />
                    <button className='btn btn-success text-center' onClick={increment} style={{ height: "40px", width: "auto" }}>+</button>
                  </div>
                  <div className="btn-containers d-flex">
                    <Button onClick={handleProductOrder} className='p-1 w-105' ><span><i className='fs-5'><IoBagCheckOutline /></i></span>Order Now</Button>
                    <Button onClick={() => AddToCart(data,value)} className='btn btn-warning p-1 w-105' style={{ position: "relative", left: 5 }}><span><i className='fs-5'><BsCartPlus /></i></span>Add To Cart</Button>
                  </div>
                </Col>
              </Card.Body>
            </Col>
          </Row>
        </Card>
        <hr />
        {data.spec &&
          <div>
            <Card.Text className="display-5 py-3">Specifications</Card.Text>
            <Table bordered>
              <tbody>
                {Object.entries(data.spec).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : value}
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </Table>
            <hr />
          </div>
        }
        <div>
          {
            data.description &&
            <div>
              <Card.Text className="display-5">Description</Card.Text>
              <Card.Text
                className="text-align-justify"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></Card.Text>
            </div>
          }

          <hr />
        </div>
        <div>
          <Card.Text className='display-5'>Similar Products</Card.Text>
          <Row className='py-3'>
            {
              related.length > 0 && related.map((item) => {
                return <Col md={3} key={item.id}><MiniProductCard key={item.id} data={item} /> </Col>
              })
            }
          </Row>
          <hr />
        </div>


        <div>
          {
            reviews.length > 0 &&
            <div className='py-3'>
              <Card.Text className='display-5'>Ratings & Reviews</Card.Text>
              {
                reviews.map((item) => {
                  return <ReviewCard key={item.id} data={item} />
                })
              }
              <hr />
            </div>
          }
        </div>
      </Container>
    </div >
  )
}

export default ProductDetailsCard;