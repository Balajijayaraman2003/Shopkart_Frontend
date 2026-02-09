import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import MiniProductCard from '../components/Products/MiniProductCard'
import { useLocation } from 'react-router-dom'

function Category() {
    const [category, setCategory] = useState([])
    const {state} = useLocation()
    const {id} = state
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/app/category-products/${id}`)
            .then((response) => {
                setCategory(response.data.results)
            })
    }, [])
    console.log(category)
    return (
        <div className='main-container'>
            <Row>
                {
                    category.map((data) => (
                        <Col md={2}>
                        <MiniProductCard data={data} />
                        </Col>

                    ))
                }
            </Row>
        </div>
    )
}

export default Category