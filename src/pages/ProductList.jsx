import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/Products/ProductCard';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


// MUI  
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductList() {
  const query = useQuery();
  const searchTerm = query.get('search') || '';
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/app/products/search/?search=${searchTerm}`)
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [searchTerm]);

    console.log("Data",data)

  return (
    <div className='main-container'>
      <Container>
        <Row>
          {data.length > 0 ? (
            data.map((item) => (
              <div className="product_detail" key={item.code}>
                <Link to={`product-detail/${item.code}`} className='text-decoration-none'>
                  <Col lg={12} md={2} key={item.code}>
                    <ProductCard data={item} />
                  </Col>
                </Link>
              </div>
            ))
          ) : (
            <p className='display-5 d-flex align-items-center justify-content-center h-100'>No products found for <span>"<b>{searchTerm}</b>"</span></p>
          )}
        </Row>
      </Container>
    </div>


  );
}

export default ProductList;