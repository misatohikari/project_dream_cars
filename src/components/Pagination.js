// components/Pagination.js
import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <ButtonGroup>
        <Button 
          variant="secondary" 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
        >
          Back
        </Button>
        <Button variant="light" disabled>
          Page {currentPage} of {totalPages}
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Pagination;
