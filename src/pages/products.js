// pages/products.js
import { useAtom } from 'jotai';
import { carsAtom } from '../state/atoms';
import { Container, Row, Col } from 'react-bootstrap';
import Products from '../components/Products';

const ProductsPage = () => {
  const [cars] = useAtom(carsAtom);
  console.log(`cars Atom:${cars}`);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Explore All Vehicles</h1>
          <Products cars={cars} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
