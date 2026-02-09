import React from "react";
import { Card, Container, Row, Col, Button, Table, Badge, Placeholder } from "react-bootstrap";

function ProductDetailsSkeleton() {
  return (
    <Container>
      <Card className="p-3 shadow-sm">
        <Row>
          {/* Image Skeleton */}
          <Col md={4} className="border-end d-flex align-items-center justify-content-center">
            <div style={{ height: "400px", width: "100%" }} className="bg-light d-flex align-items-center justify-content-center">
              <Placeholder as="div" animation="glow" className="w-100 h-100">
                <Placeholder xs={12} className="h-100" />
              </Placeholder>
            </div>
          </Col>

          {/* Content Skeleton */}
          <Col md={8} className="ps-4">
            <Card.Body>
              <Col md={8}>
                {/* Title */}
                <Card.Title>
                  <Placeholder as="p" animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                </Card.Title>

                {/* Tags */}
                <Card.Text className="d-flex">
                  <Placeholder as="span" animation="glow">
                    <Placeholder xs={2} className="me-2" />
                    <Placeholder xs={2} className="me-2" />
                  </Placeholder>
                </Card.Text>

                {/* Short description */}
                <Card.Title>
                  <Placeholder as="p" animation="glow">
                    <Placeholder xs={8} />
                  </Placeholder>
                </Card.Title>

                {/* Rating */}
                <Card.Text className="d-flex align-items-center">
                  <Placeholder as="span" animation="glow">
                    <Placeholder xs={2} />
                  </Placeholder>
                </Card.Text>

                {/* Price */}
                <Card.Title>
                  <Placeholder as="p" animation="glow">
                    <Placeholder xs={3} className="me-2" />
                    <Placeholder xs={4} />
                  </Placeholder>
                </Card.Title>

                {/* Payment Options */}
                <Card.Title>
                  <Placeholder as="p" animation="glow">
                    <Placeholder xs={10} />
                  </Placeholder>
                </Card.Title>
              </Col>

              {/* Quantity & Buttons */}
              <Col md={3}>
                <div className="quantity d-flex align-items-center my-3 w-100">
                  <Placeholder.Button variant="danger" xs={2} className="me-2" />
                  <Placeholder xs={2} className="me-2" />
                  <Placeholder.Button variant="success" xs={2} />
                </div>
                <div className="btn-containers d-flex">
                  <Placeholder.Button variant="primary" xs={4} className="me-2" />
                  <Placeholder.Button variant="warning" xs={4} />
                </div>
              </Col>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* Specifications Skeleton */}
      <hr />
      <p className="display-5 py-3">Specifications</p>
      <Table bordered>
        <tbody>
          {[...Array(3)].map((_, i) => (
            <tr key={i}>
              <td>
                <Placeholder xs={4} />
              </td>
              <td>
                <Placeholder xs={8} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Description Skeleton */}
      <hr />
      <Card.Text className="display-5">Description</Card.Text>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} />
        <Placeholder xs={10} />
        <Placeholder xs={8} />
      </Placeholder>

      {/* Similar Products Skeleton */}
      <hr />
      <p className="display-5">Similar Products</p>
      <Row className="py-3">
        {[...Array(3)].map((_, i) => (
          <Col key={i} md={4}>
            <Card className="p-2">
              <Placeholder as="div" animation="glow">
                <Placeholder xs={12} className="mb-2" style={{ height: "150px" }} />
                <Placeholder xs={6} />
              </Placeholder>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Reviews Skeleton */}
      <hr />
      <p className="display-5">Ratings & Reviews</p>
      {[...Array(2)].map((_, i) => (
        <Card key={i} className="p-3 mb-2">
          <Placeholder as="p" animation="glow">
            <Placeholder xs={8} />
            <Placeholder xs={10} />
          </Placeholder>
        </Card>
      ))}
    </Container>
  );
}

export default ProductDetailsSkeleton;