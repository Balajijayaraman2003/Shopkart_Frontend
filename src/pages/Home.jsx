import React, { useEffect, useState } from 'react';
import { Container, Alert, Row, Col } from 'react-bootstrap';
import Carouselcomp from '../components/Home/Carouselcomp';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from "axios"
import MiniProductCard from "../components/Products/MiniProductCard"
import CategoryCard from '../components/Base/CategoryCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Home() {
  const [showAlert, setShowAlert] = useState(false);
  const [topDeals, setTopDeals] = useState([])
  const [arrivals, setArrivals] = useState([])

  const userData = useSelector((state) => state.user)
  useEffect(() => {
    if (!userData.address) {
      setShowAlert(true)
    }
  }, [userData])



  useEffect(() => {
    axios.get("http://127.0.0.1:8000/app/deals/")
      .then((response) => {
        setTopDeals(response.data.results)
      })
  }, [])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/app/arrivals/")
      .then((response) => {
        setArrivals(response.data.results)
      })
  }, [])



  return (
    <div className='main-container'>
      <Container fluid>
        {showAlert && (
          <Alert variant="primary" onClose={() => setShowAlert(false)} dismissible style={{}}>
            Please Add Your Address For Purchansing: <Link to="/address">Add Address</Link>
          </Alert>
        )}
        <Row>
          <Col>
            <Carouselcomp />
          </Col>
        </Row>
        <Container>
          <h2 className='display-5 my-3'>Top Deals</h2>
          <ArrowBackIosIcon style={{ zIndex: 100 }} />
          <Row className="d-flex flex-column overflow-scroll" style={{ scrollbarWidth: 'none', height: "550px" }}>
            {
              topDeals && topDeals.map((data) => {
                return <Col md={3} xs={6} key={data.id}> <MiniProductCard data={data} /> </Col>
              })
            }
          </Row>
          <ArrowForwardIosIcon />
          <h2 className="display-5 my-3">New Arrivals</h2>
          <Row className="d-flex flex-column overflow-scroll" style={{ scrollbarWidth: 'none', height: "550px" }}>
            {
              arrivals && arrivals.map((data) => {
                return <Col md={3} key={data.id} > <MiniProductCard data={data} /> </Col>
              })
            }
          </Row>

          <div className="category-container d-none d-md-block">
            <h2 className="display-5 py-3">Categories</h2>
            <div className='pb-5'>
              <CategoryCard />
            </div>
          </div>

        </Container>
      </Container>
    </div>
  );
}

export default Home;