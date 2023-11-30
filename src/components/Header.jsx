import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import logomark from '../assets/logomark.svg';
import { removeAuth } from '../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';

export const Header = () => {  
  const { isAuth } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <Navbar.Collapse id="navbarScroll">
      <Container className="d-flex justify-content-between">
        <Nav className="align-items-center">
          <NavLink
            to='/'
            className='nav-link d-flex align-items-center'
            aria-label='Home page'
          >
            <img
              src={logomark}
              alt='home-logo'
              height='30'
              className='me-1'
            />

            <span>
              Home
            </span>
          </NavLink>
        </Nav>

        <Nav className="align-items-center">
          <NavLink
            to='/instructions'
            className='nav-link'
          >
            <span>
              How to Use
            </span>
          </NavLink>

          <NavLink
            to='/dev'
            className='nav-link'
          >
            <span>
              Developer
            </span>
          </NavLink>

          {isAuth ? (
            <>
              <NavLink
                to='/transactions'
                className='nav-link'
              >
                <span>
                  Transactions
                </span>
              </NavLink>

              <NavLink
                to='/results'
                className='nav-link'
              >
                <span>
                  Financial Results
                </span>
              </NavLink>

              <Button
                variant='outline-light'
                onClick={logoutHandler}
                className='ms-1'
              >
                Log out
              </Button>
            </>
          ) : (
            <Button
              variant='outline-light'
              onClick={() => navigate('/login')}
              className='ms-2 '
            >
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar.Collapse>
  );
};
