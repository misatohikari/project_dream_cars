import React from 'react';

import ProtectedRoute from '@/components/RouterGuard';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { userAtom } from '../state/atoms';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

export default function Dashboard() {
  const router = useRouter();
  const [user] = useAtom(userAtom);

  const handleFavorites = () => {
    router.push('/favorite');
  };

  const handleHistory = () => {
    router.push('/history');
  };

  return (
    <ProtectedRoute>
      <Container className="d-flex flex-column justify-content-center align-items-center mt-5 pt-3"
      style={{ 
        backgroundImage: 'url(/home.webp)', 
        backgroundSize: 'cover', // Ensure the image covers the whole container
        backgroundPosition: 'center', // Center the image
        minHeight: '120vh' // Ensure the container takes full viewport height
      

      }}
      >
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={14} lg={12}>
            <Card 
              className="text-center shadow-lg" 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.6)', // Adjust transparency
                border: 'none', // Optional: remove the border
                width: '100%', // Ensure the card takes full width of the column
                maxWidth: '2400px' // Set a maximum width if needed
              }}
            >
              <Card.Body>
                <Card.Title as="h1" className="mb-3">Welcome to Dashboard!</Card.Title>
                <Card.Subtitle as="h5" className="mb-4 text-muted">
                  Good to see you, {user?.userName}
                </Card.Subtitle>
                <Row className="justify-content-center">
                  <Col xs="auto" className="mb-3">
                    <Button variant="primary" size="lg" onClick={handleFavorites}>
                      My Favorites
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button variant="secondary" size="lg" onClick={handleHistory}>
                      My History
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ProtectedRoute>
  );
}

