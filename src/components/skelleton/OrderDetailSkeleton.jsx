import React from "react";
import { Card, Col, Container, Row, Placeholder } from "react-bootstrap";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function OrderDetailSkeleton() {
  return (
    <Container>
      <Card className="py-3 shadow-sm">
        <Row>
          {/* Image Skeleton */}
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center border-end"
          >
            <Skeleton
              variant="rectangular"
              width={300}
              height={400}
              animation="wave"
            />
          </Col>

          {/* Content Skeleton */}
          <Col md={8}>
            <Card.Body>
              {/* Product Name */}
              <Card.Title>
                <Placeholder as="h3" animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </Card.Title>

              {/* Quantity */}
              <Card.Text>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={4} />
                </Placeholder>
              </Card.Text>

              {/* Status */}
              <Card.Text>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={5} />
                </Placeholder>
              </Card.Text>

              {/* Stepper Skeleton */}
              <Box sx={{ width: "100%", mt: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Box>
            </Card.Body>

            {/* Review Button Skeleton */}
            <div className="mt-3">
              <Skeleton variant="rectangular" width={120} height={40} />
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default OrderDetailSkeleton;