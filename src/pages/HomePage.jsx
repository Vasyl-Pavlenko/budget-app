import { useNavigate } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';
import { removeAuth } from '../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';

const Home = () => {  
  const { isAuth } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    try {
      dispatch(logout());
      removeAuth();
      toast.success('👋 You have been successfully logged out. We hope to see you again soon!');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('❌ An error occurred during logout. Please try again later.');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="text-center p-4">
        <Card.Title
          as="h1"
          className="display-4"
        >
          Welcome to Budjify! 🌟
        </Card.Title>

        <Card.Text className="lead">
          Your personal budget management made easy.
          <br />
          Join our family of savvy budgeters and start budgeting today! 💸✨
        </Card.Text>

        {isAuth ? (
          <Container className="mt-4">
            <Button
              variant="success"
              className="mx-2"
              onClick={() => navigate('/transactions')}
            >
              Transactions
            </Button>

            <Button
              variant="danger"
              className="mx-2"
              onClick={logoutHandler}
            >
              Log out
            </Button>
          </Container>
        ) : (
          <Button
            variant="success"
            className="mt-4 mx-auto w-25"
            onClick={() => navigate('/login')}
          >
            Log in
          </Button>
        )}
      </Card>
    </Container>
  );
};

export default Home;
