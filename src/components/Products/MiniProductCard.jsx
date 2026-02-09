import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function MiniProductCard({ data }) {
    return (
            <Link to={`/products/product-detail/${data.code}`} className='text-decoration-none'>
                <Card className='p-3 mini-card' style={{height:"500px",overflow:"hidden",}}>
                    <Card.Img src={data.image.image} className='img-fluid' style={{ Height: "200px", maxHeight: "300px", width: "auto" }} />
                    <Card.Body className='p-2'>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text >
                            <span>Price:</span>
                            <span className='text-danger'> &#8377;<s>{data.old_price}</s></span>
                            <span className='fs-5 ps-2'>&#8377;{data.selling_price}</span>
                        </Card.Text>
                        <Card.Text>
                            {data.short_description}
                        </Card.Text>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
    )
}

export default MiniProductCard