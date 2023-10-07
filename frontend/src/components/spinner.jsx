import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  return (
    <div className="premium-spinner-container">
    <Spinner animation="border" role="status" variant="primary" />
    <div className="spinner-text">Loading...</div>
  </div>
  );
};

export default LoadingSpinner;
