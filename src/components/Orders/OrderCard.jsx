import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function OrderCard({ data }) {
    return (
        <div>
            <Row className='my-3'>
                <Link to={`/order-details/${data.order_id}`} className='text-decoration-none'>
                    <Card style={{ maxHeight: "400px", overflow: "hidden" }} className='py-3 d-flex '>
                        <Row>
                            <Col md={3}>
                                <div className='m-auto d-flex align-items-center justify-content-center'>{data.products.map((item) => {
                                    return <Card.Img style={{ maxHeight: "200px", width: "auto" }}
                                        src={item.product.image.image}
                                        key={item.product.id}
                                    />
                                })}</div>
                            </Col>
                            <Col>
                                <Card.Body>
                                    <div className=''>
                                        {
                                            data.products.map((item) => {
                                                return <div key={item.product.id}>
                                                    <Card.Text className='h5'>{item.product.name}</Card.Text>
                                                    <Card.Text>{item.product.short_description}</Card.Text>
                                                    <Card.Text><s className='fs-5 text-danger me-2'>{item.product.old_price}</s> <span className='fs-3'>{item.product.selling_price}</span></Card.Text>
                                                    <div className="fs-4"><p> Product Quantity : {item.quantity}</p></div>
                                                    <div>Status : {data.status}</div>
                                                </div>
                                            })
                                        }

                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Link>
            </Row>
        </div >
    )
}

export default OrderCard