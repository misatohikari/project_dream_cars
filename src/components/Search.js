import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { carsAtom } from '../state/atoms';
import { getCars } from '../pages/api/cars';
import Header from '../components/Header';
import Card from '../components/CardComponent';
import carMakes from '../carMakes';
import carModels from '../carModels';
import styles from '../styles/SearchPage.module.css';

const years = Array.from({ length: 6 }, (_, i) => 2015 + i).map(year => ({ value: year, label: year }));

const SearchPage = () => {
  const router = useRouter();
  const [cars, setCars] = useAtom(carsAtom);
  const [userInput, setUserInput] = useState({ make: '', model: '', year: '' });
  const [modelOptions, setModelOptions] = useState([]);
  const [displayModels, setDisplayModels] = useState(false);
  const [currentMake, setCurrentMake] = useState('');
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    if (currentMake) {
      setModelOptions(carModels[currentMake] || []);
      setDisplayModels(true);
    } else {
      setDisplayModels(false);
    }
  }, [currentMake]);

  const handleMakeChange = (e) => {
    setUserInput(prevState => ({ ...prevState, make: e.target.value.trim() }));
  };

  const handleModelChange = (e) => {
    setUserInput(prevState => ({ ...prevState, model: e.target.value.trim() }));
  };

  const handleYearChange = (selectedOption) => {
    const year = selectedOption ? selectedOption.value : '';
    setUserInput(prevState => ({ ...prevState, year }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await getCars(userInput);
    setCars(data);
    router.push('/products');
  };

  const handleCardClick = (make) => {
    setUserInput(prevState => ({ ...prevState, make }));
    setCurrentMake(make);
    setVisibleIndex(0);
  };

  const handleModelClick = (model) => {
    setUserInput(prevState => ({ ...prevState, model }));
  };

  const handleBackClick = () => {
    setDisplayModels(false);
    setCurrentMake('');
    setVisibleIndex(0);
  };

  const handleNext = () => {
    const maxIndex = displayModels ? modelOptions.length : carMakes.length;
    if (visibleIndex + 5 < maxIndex) {
      setVisibleIndex(prevIndex => prevIndex + 5);
    }
  };

  const handlePrev = () => {
    if (visibleIndex > 0) {
      setVisibleIndex(prevIndex => prevIndex - 5);
    }
  };

  const visibleItems = displayModels
    ? modelOptions.slice(visibleIndex, visibleIndex + 5)
    : carMakes.slice(visibleIndex, visibleIndex + 5);

  return (
    <>
      <Header />
      <Container
        className="d-flex flex-column justify-content-center align-items-center mt-5 pt-3"
        style={{
          minHeight: '120vh',
          backgroundImage: 'url(/home2.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Row className="text-center text-grey">
          <Col>
            <h1>Search for Vehicles</h1>
            <br />
            <h5>Find Your Dream Cars!</h5>
          </Col>
        </Row>
        <br />
        <Row className="align-items-center">
          <Col xs="auto">
            <div
              className="p-4 rounded shadow bg-white d-flex align-items-center"
              style={{ width: '100%', maxWidth: '600px' }}
            >
              <Form onSubmit={handleSearch} className="d-flex w-100">
                <Form.Group controlId="formMake" className="mb-0 me-2 flex-fill">
                  <Form.Control
                    type="text"
                    placeholder="Make"
                    value={userInput.make}
                    onChange={handleMakeChange}
                  />
                </Form.Group>
                <Form.Group controlId="formModel" className="mb-0 me-2 flex-fill">
                  <Form.Control
                    type="text"
                    placeholder="Model"
                    value={userInput.model}
                    onChange={handleModelChange}
                  />
                </Form.Group>
                <Form.Group controlId="formYear" className="mb-0 me-2 flex-fill">
                  <Select
                    options={years}
                    value={userInput.year ? { value: userInput.year, label: userInput.year } : null}
                    onChange={handleYearChange}
                    placeholder="Year"
                    isClearable
                    styles={{ control: (provided) => ({ ...provided, width: '150px' }) }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <br />
        <Row className="text-center mb-3">
          <Col>
            <h3 className="text-white">Explore Our Models</h3>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center position-relative">
          <Button
            variant="link"
            onClick={handlePrev}
            className={`${styles.navButton} ${styles.navButtonPrev}`}
          >
            &#8249;
          </Button>
          <div className={styles.carouselContainer}>
            <div className={styles.carouselWrapper}>
              {visibleItems.map((item, index) => (
                <div
                  key={index}
                  className={styles.carouselItem}
                  onClick={() => displayModels ? handleModelClick(item) : handleCardClick(item)}
                >
                  <Card
                    name={item}
                    isModel={displayModels}
                    currentMake={displayModels ? currentMake : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="link"
            onClick={handleNext}
            className={`${styles.navButton} ${styles.navButtonNext}`}
          >
            &#8250;
          </Button>
        </Row>
        {displayModels && (
          <Row className="justify-content-center mt-3">
            <Button variant="secondary" onClick={handleBackClick}>Back to Makes</Button>
          </Row>
        )}
      </Container>
    </>
  );
};

//   return (
//     <>
//       <Header />
//       <Container className="mt-5 pt-3">
//         <Row>
//           <Col>
//             <h1>Search for Vehicles</h1>
//           </Col>
//         </Row>
//         <Row className="align-items-center">
//           <Col xs="auto">
//             <Form onSubmit={handleSearch} className="d-flex align-items-center">
//               <Form.Group controlId="formMake" className="mb-0 me-2">
//                 <Form.Control
//                   type="text"
//                   name="make"
//                   value={userInput.make}
//                   onChange={handleChange}
//                   placeholder="Make"
//                   style={{ maxWidth: '150px' }}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formModel" className="mb-0 me-2">
//                 <Form.Control
//                   type="text"
//                   name="model"
//                   value={userInput.model}
//                   onChange={handleChange}
//                   placeholder="Model"
//                   style={{ maxWidth: '150px' }}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formYear" className="mb-0 me-2">
//                 <Form.Control
//                   type="text"
//                   name="year"
//                   value={userInput.year}
//                   onChange={handleChange}
//                   placeholder="Year"
//                   style={{ maxWidth: '100px' }}
//                 />
//               </Form.Group>
//               <Button variant="primary" type="submit">
//                 Search
//               </Button>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

export default SearchPage;
