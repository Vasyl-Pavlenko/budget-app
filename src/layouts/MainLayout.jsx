import { Outlet } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Layout = () => {
  return (
    <div className='d-flex flex-column min-vh-100 bg-primary-subtle'>
      <header>
        <Navbar
          bg='primary'
          variant='dark'
        >
          <Container>
            <Header />
          </Container>
        </Navbar>
      </header>

      <main className='flex-grow-1'>
        <Container>
          <Outlet />
        </Container>
      </main>

      <footer className='bg-primary text-center text-white'>
        <Container>
          <Footer />
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
