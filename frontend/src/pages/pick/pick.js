import React, { useState } from 'react';
import { Button, Form, Col, Row, Alert } from 'react-bootstrap';

const ScanWasteForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    scrap: '',
    price: '',
    area: '',
    pincode: '',
    nearbyPlace: '',
    wasteAmount: '',
  });

  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Prepare form data for submission
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    files.forEach((file) => {
      data.append('files', file);
    });

    try {
      const response = await fetch('http://127.0.0.1:5000/api/waste/scan', {
        method: 'POST',
        body: data,
        credentials: 'include', // To send cookies with request
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.message);
        setFormData({
          age: '',
          scrap: '',
          price: '',
          area: '',
          pincode: '',
          nearbyPlace: '',
          wasteAmount: '',
        });
        setFiles([]);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Scan Waste</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Age
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              placeholder="Enter your age"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Scrap
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="scrap"
              value={formData.scrap}
              onChange={handleChange}
              required
              placeholder="Enter type of scrap"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Price
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Area
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              placeholder="Enter your area"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Pincode
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              placeholder="Enter your pincode"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Nearby Place
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="nearbyPlace"
              value={formData.nearbyPlace}
              onChange={handleChange}
              required
              placeholder="Enter a nearby place"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Waste Amount
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="wasteAmount"
              value={formData.wasteAmount}
              onChange={handleChange}
              required
              placeholder="Enter waste amount"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Upload Images
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              multiple
              required
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Scan Waste
        </Button>
      </Form>
    </div>
  );
};

export default ScanWasteForm;
