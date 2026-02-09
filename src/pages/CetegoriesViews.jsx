import Grid from '@mui/material/Grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CetegoriesViews() {
  const [category, setCategory] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/app/categories/")
      .then((response) => {
        setCategory(response.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  console.log(category)

  return (
    <div className='main-container'>
      <Row gap={2} className='p-2 m-2'>
        {
          category && category.map((item, index) => {
            console.log(item.image)
            return (
              <Col key={index} xs={6} className='my-2 d-flex'>
                <Link to="/category" state={{ id: item.code }} className='text-decoration-none'>
                  <Card className='w-100 h-100 p-2'>
                    <Image src={item.image} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />
                    <p className='text-center py-2 fs-5'>{item.name}</p>
                  </Card>
                </Link>
              </Col>
            )
          })
        }

      </Row>
    </div>
  )
}

export default CetegoriesViews