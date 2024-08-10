import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { carsAtom } from '../state/atoms';
import { getCars } from '../pages/api/cars';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Select from 'react-select';
import carMakes from '../carMakes'; // Import car makes data
import carModels from '../carModels'; // Import car models data

const years = Array.from({ length: 6 }, (_, i) => 2015 + i).map(year => ({ value: year, label: year }));

const SearchPage = () => {
  const router = useRouter();
  const [cars, setCars] = useAtom(carsAtom);
  const [userInput, setUserInput] = useState({ make: '', model: '', year: '' });
  const [searchHistory, setSearchHistory] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

  const handleMakeChange = (selectedOption) => {
    const make = selectedOption ? selectedOption.value : '';
    setUserInput(prevState => ({ ...prevState, make }));
    setModelOptions(make ? (carModels[make] || []).map(model => ({ value: model, label: model })) : []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput(prevState => ({ ...prevState, [name]: value.trim() }));
  };

  const handleYearChange = (selectedOption) => {
    const year = selectedOption ? selectedOption.value : '';
    setUserInput(prevState => ({ ...prevState, year }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const existingSearch = searchHistory.find(
      history => history.make === userInput.make && history.model === userInput.model && history.year === userInput.year
    );

    if (existingSearch) {
      setCars(existingSearch.data);
    } else {
      const data = await getCars(userInput);
      setCars(data);
      setSearchHistory(prevHistory => [...prevHistory, { ...userInput, data }]);
      router.push('/products');
    }
  };

  return (
    <>
      <Header />
      <Container
        className="d-flex flex-column justify-content-center align-items-center mt-5 pt-3"
        style={{
          minHeight: '120vh',
          backgroundImage: 'url(/home2.jpg)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Row className="text-center text-white">
          <Col>
            <h1>Search for Vehicles</h1>
            <br />
            <h6>Find Your Dream Cars!</h6>
          </Col>
        </Row>
        <br />
        <Row className="align-items-center">
          <Col xs="auto">
            <div
              className="p-4 rounded shadow bg-white d-flex align-items-center"
              style={{ width: '100%', maxWidth: '800px' }} // Adjust the width as needed
            >
              <Form onSubmit={handleSearch} className="d-flex w-100">
                <Form.Group controlId="formMake" className="mb-0 me-2 flex-fill">
                  <Select
                    options={carMakes.map(make => ({ value: make, label: make }))}
                    value={userInput.make ? { value: userInput.make, label: userInput.make } : null}
                    onChange={handleMakeChange}
                    placeholder="Make"
                    isClearable
                    styles={{ control: (provided) => ({ ...provided, width: '250px' }) }} // Adjust width of the dropdown
                  />
                </Form.Group>
                <Form.Group controlId="formModel" className="mb-0 me-2 flex-fill">
                  <Select
                    options={modelOptions}
                    value={userInput.model ? { value: userInput.model, label: userInput.model } : null}
                    onChange={(option) => setUserInput(prevState => ({ ...prevState, model: option ? option.value : '' }))}
                    placeholder="Model"
                    isClearable
                    styles={{ control: (provided) => ({ ...provided, width: '250px' }) }} // Adjust width of the dropdown
                  />
                </Form.Group>
                <Form.Group controlId="formYear" className="mb-0 me-2 flex-fill">
                  <Select
                    options={years}
                    value={userInput.year ? { value: userInput.year, label: userInput.year } : null}
                    onChange={handleYearChange}
                    placeholder="Year"
                    isClearable
                    styles={{ control: (provided) => ({ ...provided, width: '150px' }) }} // Adjust width of the dropdown
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
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