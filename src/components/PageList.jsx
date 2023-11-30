import { Card, ListGroup, Row, Col } from 'react-bootstrap';

const PageList = ({ title, items }) => (
  <Row className="mt-4">
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          
          <Card.Text>
            <ListGroup>
              {items.map((item, index) => (
                <ListGroup.Item key={index}>{item}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);

export default PageList