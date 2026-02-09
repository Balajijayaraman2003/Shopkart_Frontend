import React, { useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Address() {
  const [address, setAddress] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    for (let key in address) {
      formData.append(key, address[key]);
    }

    const token = localStorage.getItem('access_token');
    axios
      .post('http://127.0.0.1:8000/auth/address/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to submit address. Please try again.');
      });
  }

  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={6}>
            <h1 className="text-center">Add Address For Purchasing</h1>
            <Form onSubmit={handleSubmit} className="p-3">
              <FormGroup>
                <Form.Label htmlFor="full_name">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  id="full_name"
                  value={address.full_name || ''}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label htmlFor="mobile">Mobile No</Form.Label>
                <Form.Control
                  type="tel"
                  name="mobile"
                  id="mobile"
                  pattern="[6-9]\d{9}"
                  title="Enter a valid 10-digit Indian mobile number"
                  value={address.mobile || ''}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label htmlFor="house_no">House No. / Building No. / Flat No.</Form.Label>
                <Form.Control
                  type="text"
                  name="house_no"
                  id="house_no"
                  value={address.house_no || ''}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label htmlFor="area">Area</Form.Label>
                <Form.Control
                  type="text"
                  name="area"
                  id="area"
                  value={address.area || ''}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label htmlFor="landmark">Landmark</Form.Label>
                <Form.Control
                  type="text"
                  name="landmark"
                  id="landmark"
                  value={address.landmark || ''}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label htmlFor="pincode">Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="pincode"
                  id="pincode"
                  value={address.pincode || ''}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  id="city"
                  value={address.city || ''}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label htmlFor="state">State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  id="state"
                  value={address.state || ''}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label htmlFor="country">Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  id="country"
                  value={address.country || ''}
                  onChange={handleChange}
                />
              </FormGroup>

              {error && <p className="text-danger mt-2">{error}</p>}

              <div className="my-3 btn-container d-flex justify-content-between">
                <Button type="button" variant="danger" onClick={() => setAddress({})}>
                  Clear
                </Button>
                <Button type="submit">Add Address</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
  
}

export default Address;