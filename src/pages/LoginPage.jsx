import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import { setAuth } from '../helpers';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
  try {
    if (
      username === process.env.REACT_APP_USERNAME
      && password === process.env.REACT_APP_PASSWORD
    ) {
      dispatch(login());
      setAuth();
      toast.success('🎉 Welcome back! Enjoy your time on our platform!');
      navigate('/transactions');
    } else {
      toast.error('❌ Oops! Wrong login or password. Please double-check and try again.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    toast.error('❌ An error occurred during login. Please try again later.');
  }
};

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={4}>
          <Form className="d-flex flex-column">
            <h2 className="mb-4 text-center">
              Welcome back!
            </h2>

            <Form.Group
              className="mb-3"
              controlId="username"
            >
              <Form.Label>
                Username:
              </Form.Label>
              
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleChangeUsername}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-4"
              controlId="password"
            >
              <Form.Label>
                Password:
              </Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChangePassword}
                required
              />
            </Form.Group>

            <Button
              variant="success"
              className="w-50 mx-auto"
              onClick={handleLogin}
            >
              Log in
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
