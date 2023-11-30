import { useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate()

  return (
    isAuth ? (
      children
      ) : (
        <Container className="d-flex flex-column align-items-center justify-content-center mt-5">
          <h1 className="text-center mb-4">
            Oops! Access Denied
          </h1>
            
          <p className="text-center">
            This page is for registered users only. Please log in to access it.
          </p>

          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="success"
              className="me-2"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>

            <Button
              variant="success"
              className="me-2"
              onClick={() => navigate('/')}
            >
              Go Home
            </Button>

            <Button
              variant="success"
              className="me-2"
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
          </div>
        </Container>
    )
  );
};
