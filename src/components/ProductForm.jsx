
import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';

function ProductForm() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    axios.post('https://fakestoreapi.com/products', {
      title,
      price: parseFloat(price),
      description,
      category,
      image: 'https://via.placeholder.com/150', 
    })
      .then(() => {
        setSuccess('Product created! (Note: FakeStoreAPI does not persist new products.)');
        setTitle('');
        setPrice('');
        setDescription('');
        setCategory('');
      })
      .catch(() => {
        setError('Failed to create product.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-3">Add New Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Enter product title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            placeholder="Enter product description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            placeholder="Enter category"
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Add Product'}
        </Button>
	  </Form>
    </Container>
  );
}

export default ProductForm;

