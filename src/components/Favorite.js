import { useAtom } from 'jotai';
import { favoriteAtom } from '../state/atoms';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Pagination from './Pagination'; // Import your Pagination component

const Favorite = () => {
  const [favorites] = useAtom(favoriteAtom);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetails = (car) => {
    router.push(`/product/${car.id}/page`);
  };

  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 'N/A';
  };

  const displayedFavorites = favorites.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container className="mt-5 pt-3" style={{ marginTop: '70px' }}>
      <h1 className="text-center mb-4">Favorites</h1>
      <Row>
        {displayedFavorites.length > 0 ? (
          displayedFavorites.map((car) => (
            <Col key={car.id} sm={6} md={4} lg={3}>
              <Card style={{ height: '450px' }}>
                <Card.Img 
                  variant="top" 
                  src="/products1.webp" 
                  alt="Car Detail Picture" 
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
                />
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <Card.Title>{car.make_model.make.name} {car.make_model.name} - {car.year}</Card.Title>
                    <Card.Text>{car.description}</Card.Text>
                  </div>
                  <hr style={{ margin: '10px 0' }}/>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                    <p style={{ marginBottom: '0' }}>Price: ${formatPrice(car?.msrp)}</p>
                  </div>
                  <Button variant="primary" onClick={() => handleViewDetails(car)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No favorites available.</p>
          </Col>
        )}
      </Row>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
      <div className="d-flex justify-content-center my-4">
        <Button variant="secondary" onClick={() => router.push('/')}>
          Back to Search
        </Button>
      </div>
    </Container>
  );
};

export default Favorite;
