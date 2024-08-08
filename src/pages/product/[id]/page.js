import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { selectedCarAtom, favoriteAtom, searchHistoryAtom } from '../../../state/atoms';
import { useEffect, useState } from 'react';
import { getCarDetails } from '../../api/cars';
import { Container, Row, Col, Card, ListGroup, Modal, Button } from 'react-bootstrap';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedCar, setSelectedCar] = useAtom(selectedCarAtom);
  const [favorites, setFavorites] = useAtom(favoriteAtom);
  const [history, setHistory] = useAtom(searchHistoryAtom);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      getCarDetails(id)
        .then(car => {
          console.log('Data returned from car details API:', car); 
          setSelectedCar(car);
          setShowModal(true);

          setHistory((prevHistory) => [car, ...prevHistory.filter(item => item.id !== car.id)]);
        })
        .catch(error => {
          console.error('Error fetching car details:', error);
        });
    }
  }, [id]);

  if (!selectedCar) return <p>Loading...</p>;

  const renderColorSwatch = (color) => {
    if (!color.rgb) {
      return <span>{color.name} (Color data not available)</span>;
    }
    const [r, g, b] = color.rgb.split(',').map(Number);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = brightness > 125 ? 'black' : 'white';

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '130px',
          height: '50px',
          backgroundColor: `rgb(${color.rgb})`,
          border: '1px solid #000',
          color: textColor,
          textAlign: 'center',
          lineHeight: 'normal',
          marginRight: '5px',
          marginBottom: '5px',
          fontSize: '12px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          padding: '5px'
        }}
      >
        {color.name}
      </div>
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/products'); // Navigate back to products
  };

  const handleAddToFavorites = () => {
    if (selectedCar && !favorites.some(car => car.id === selectedCar.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, selectedCar]);
    }
  };

  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 'N/A';
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered size="lg" style={{ maxWidth: '90vw' }}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '24px' }}>
          <strong>{selectedCar?.make_model?.make?.name} {selectedCar?.make_model?.name} - {selectedCar?.year}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={4}>
              <Card.Img 
                variant="top" 
                src="/carDetail1.jpg" 
                alt="Car Detail Picture" 
                style={{ width: '100%', height: 'auto' }}
              />
            </Col>
            <Col md={8}>
              <Card style={{ width: '100%', maxWidth: '100%' }}>
                <Card.Body>
                  <Card.Text><strong>Description: {selectedCar?.description}</strong></Card.Text>
                  <hr></hr>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(5, 1fr)', 
                    gap: '10px',
                  }}>
                    <p style={{ fontSize: '16px', margin: '0', textAlign: 'center' }}>
                    <strong>
                      <i className="bi bi-speedometer2" style={{ fontSize: '24px' }}></i><br />
                      {selectedCar?.make_model_trim_mileage?.range_city || 'N/A'} Miles
                      </strong>
                    </p>
                    <p style={{ fontSize: '16px', margin: '0', textAlign: 'center' }}>
                    <strong>
                      <i className="bi bi-fuel-pump-fill" style={{ fontSize: '24px' }}></i><br />
                      {selectedCar?.make_model_trim_engine?.engine_type || 'N/A'}
                      </strong>
                    </p>
                    <p style={{ fontSize: '16px', margin: '0', textAlign: 'center' }}>
                    <strong>
                      <i className="bi bi-droplet-half" style={{ fontSize: '24px' }}></i><br />
                      {selectedCar?.make_model_trim_mileage?.combined_mpg || 'N/A'} mpg
                      </strong>
                    </p>
                    <p style={{ fontSize: '16px', margin: '0', textAlign: 'center' }}>
                    <strong>
                      <i className="bi bi-car-front" style={{ fontSize: '24px' }}></i><br />
                      {selectedCar?.make_model_trim_body?.type || 'N/A'}
                      </strong>
                    </p>
                    <p style={{ fontSize: '16px', margin: '0', textAlign: 'center' }}>
                    <strong>
                      <i className="bi bi-card-text" style={{ fontSize: '24px' }}></i><br />
                      {selectedCar?.make_model_trim_engine?.transmission || 'N/A'}
                      </strong>
                    </p>
                  </div>
                  <hr></hr>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '10px',
                  }}>
                   <p><strong><i className="bi bi-door-open-fill"></i> Doors: {selectedCar?.make_model_trim_body?.doors || 'N/A'}</strong></p>
                   <p><strong><i className="bi bi-diagram-2"></i> Seats: {selectedCar?.make_model_trim_body?.seats || 'N/A'}</strong></p>
                     <p><strong><i className="bi bi-truck-front"></i> Capacity: {selectedCar?.make_model_trim_body?.cargo_capacity || 'N/A'}</strong></p>
                     </div>
                     <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '10px',
                  }}>
                     <p><strong><i className="bi bi-truck-front"></i> Height: {selectedCar?.make_model_trim_body?.height || 'N/A'}</strong></p>
                     <p><strong><i className="bi bi-truck"></i> Length: {selectedCar?.make_model_trim_body?.length || 'N/A'}</strong></p>
                     <p><strong><i className="bi bi-car-front"></i> Width: {selectedCar?.make_model_trim_body?.width || 'N/A'}</strong></p>
                     
                     </div>
                  <hr></hr>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Interior Colors:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selectedCar?.make_model_trim_interior_colors?.length ? (
                          selectedCar.make_model_trim_interior_colors.map(renderColorSwatch)
                        ) : (
                          <span>Color data not available</span>
                        )}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Exterior Colors:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selectedCar?.make_model_trim_exterior_colors?.length ? (
                          selectedCar.make_model_trim_exterior_colors.map(renderColorSwatch)
                        ) : (
                          <span>Color data not available</span>
                        )}
                      </div>
                    </ListGroup.Item>
                    <hr></hr>
                  </ListGroup>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '50px', fontSize: '24px', fontWeight: 'bold' }}>
                    <p>Price: ${formatPrice(selectedCar?.msrp)}</p>
                  </div>
                  <Button onClick={handleAddToFavorites}>
                    {favorites.some(car => car.id === selectedCar.id) ? 'Added to Favourites' : 'Add to Favourites'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailPage;
