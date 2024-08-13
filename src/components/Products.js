// components/Products.js
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { selectedCarAtom, userAtom } from '../state/atoms';
import { Container, Card, Button, Col, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import Pagination from './Pagination';



const Products = ({ cars = [] }) => {
  const router = useRouter();
  const [, setSelectedCar] = useAtom(selectedCarAtom);
  const [user] = useAtom(userAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(cars.length / itemsPerPage);


  const handleViewDetails = (car) => {
    if (!user) {
      // If user is not authenticated, redirect to login page
      router.push('/login');
    } else {
      // If user is authenticated, proceed with viewing details
      setSelectedCar(car);
      router.push(`/product/${car.id}/page`);
    }
  };
  const formatPrice = (price) => {
        return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 'N/A';
      };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const displayedCars = cars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <Container
        className="mt-5 pt-3"
        style={{ marginTop: '70px' }} // Adjust this value based on your navbar height
      >
        <Row>
          {Array.isArray(displayedCars) && displayedCars.length > 0 ? (
            displayedCars.map(car => (
              <Col key={car.id} sm={6} md={4} lg={3}>
                <Card style={{ height: '450px' }}> {/* Set a fixed height for consistency */}
                  <Card.Img 
                    variant="top" 
                    src="/products1.webp" 
                    alt="Car Detail Picture" 
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
                  />
                  <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <Card.Title>{car.make_model.make.name} {car.make_model.name} - {car.year}</Card.Title>
                      <Card.Text 
                        style={{
                          filter: user ? 'none' : 'blur(4px)',
                          opacity: user ? 1 : 0.5
                        }}
                      >
                        {car.description}
                      </Card.Text>
                    </div>
                    <hr style={{ margin: '10px 0' }}/> {/* Adjust margin as needed */}
                    <div 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        alignItems: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        filter: user ? 'none' : 'blur(4px)',
                        opacity: user ? 1 : 0.5
                      }}
                    >
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
              <p>No cars available.</p>
            </Col>
          )}
        </Row>
        {cars.length > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        )}
        <div className="d-flex justify-content-center my-4">
          <Button variant="secondary" onClick={() => router.push('/')}>
            Back to Search
          </Button>
        </div>
      </Container>
    </>
  );
};
 
export default Products;
