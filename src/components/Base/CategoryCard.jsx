import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'
import { Link } from 'react-router-dom'


function Category() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/app/categories/")
            .then((response) => {
                setCategories(response.data.results)
            })
    }, [])

    return (
        <Card className='p-3'>
            <div className='d-flex' style={{overflow:"scroll",scrollbarWidth:"none"}}>
                {categories.map((item) => (
                    <div key={item.id} className='mx-2 p-2 d-flex flex-column align-items-center justify-content-center'>
                        <Link to={"/category"} state={{id:item.id}}>
                        <Avatar
                            alt={item.name}
                            src={item.image}
                            sx={{ width: 100, height: 100 }}
                        />
                        </Link>
                        <Card.Text className='py-3 text-center'>{item.name}</Card.Text>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default Category