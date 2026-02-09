import React, { useState } from 'react'
import { Card, CardBody, Button, Row, Col, Badge } from 'react-bootstrap'
import Rating from '@mui/material/Rating'


function ProductCard({ data }) {
    const [rating, setRating] = useState(data.rating)
    
    return (
        <div>

            <Card className="mb-3 p-2" >
                <Row className="g-0">
                    <Col md={4}>
                        {

                            data.image && <Card.Img className='img-fluid' src={data.image.image} alt={data.name} style={{ maxHeight: '250px', objectFit: 'contain' }} />
                        }
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title className='fs-2'>{data.name}</Card.Title>
                            <Card.Text className='d-flex'>

                                {
                                    data.tags.map((item, index) => {
                                        return <Card.Text key={index}>
                                            <Badge pill className="me-2 p-2" bg={item.variant}>{item.name}</Badge>
                                        </Card.Text>
                                    })
                                }

                            </Card.Text>


                            <Card.Text>{data.short_description || 'No description available.'}</Card.Text>
                            <Card.Text>
                                <small className="text-muted"> Price: <span className='fs-6 text-danger'>  &#8377; <s>{data.old_price}</s></span></small>
                                <small className="text-muted"><span className='fs-4 '>  &#8377; {data.selling_price} </span></small>
                                <Card.Text className='text-muted'>
                                    Ratings: <Rating
                                        name="product-rating"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        readOnly
                                        precision={0.5}
                                        size='small'
                                    /> </Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

        </div>
    )
}

export default ProductCard;