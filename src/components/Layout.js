// for layout (navbar, header, footer) features
import Header from './Header';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container fluid>
        {children}
      </Container>
    </>
  );
};

export default Layout;
