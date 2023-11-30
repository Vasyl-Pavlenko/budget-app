import { Container, Card, Row, Col } from 'react-bootstrap';
import { resultsPage } from '../constants';

const resultUsePage = () => {
  return (
    <Container>
      <Card>      
        {resultsPage.map((result, index) => (
          <Row
            className="mt-4"
            key={index}
          >
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>{result.title}</Card.Title>

                  <Card.Text>
                    <p>{result.text}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Card>
    </Container>
  );
};

export default resultUsePage;