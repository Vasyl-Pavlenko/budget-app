import React from "react";
import { useRouteError, Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="
        d-flex 
        align-items-center 
        justify-content-center 
        vh-100  
        bg-primary-subtle
      "
    >
      <Row className="justify-content-center">
        <Col
          md={8}
          className="text-center p-4 rounded"
        >
          <h1 className="display-4 mb-4">
            Uh oh! We’ve got a problem.
          </h1>

          <p className="lead">
            {error.message || error.statusText}
          </p>

          <div className="d-flex justify-content-center mt-4">
            <Button
              className="me-2"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>

            <Link to="/">
              <Button>
                Go Home
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Error;
