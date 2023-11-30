import React from 'react';
import {
  Container,
  Card,
  ListGroup,
  Button,
  CardBody
} from 'react-bootstrap';
import { buttonsData, personalProfile, skillsSummary, workExperience } from '../constants';
import { v4 as uuidv4 } from 'uuid';

const DevPage = () => {
  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">
        Developer Page
      </h1>

      <section className="mb-4 w-75 mx-auto">
        <h2 className="mb-4">
          Personal Profile
        </h2>

        <Card>
          <CardBody>
            <Card.Text>
              {personalProfile}
            </Card.Text>
          </CardBody>
        </Card>
      </section>

      <section className="mb-4 w-75 mx-auto">
        <h2 className="mb-4">
          Skills Summary
        </h2>

        <ListGroup>
          {skillsSummary.map((skill) => (
            <ListGroup.Item key={uuidv4()}>
              {skill}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </section>

      <section className="mb-4 w-75 mx-auto">
        <h2 className="mb-4">
          Work Experience
        </h2>

        <Card>
          <Card.Body>
            <Card.Title>
              {workExperience.position}
            </Card.Title>

            <Card.Subtitle className="mb-3 text-muted">
              {workExperience.date}
            </Card.Subtitle>

            <Card.Text>
              <ListGroup>
                {workExperience.responsibilities.map((responsibility) => (
                  <ListGroup.Item key={uuidv4()}>
                    {responsibility}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      </section>

      <div
        size="md"
        className="mb-4 mx-auto w-25 d-flex justify-content-center"
      >
        {buttonsData.map(({id, label, link}) => (
          <Button
            key={id}
            variant="success"
            className='me-2'
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default DevPage;
