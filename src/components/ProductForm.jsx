import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';

function ProductForm({ mode = 'add' }) {
  const isEdit = mode === 'edit';
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const [loading, setLoading] = useState(false);       
  const [prefillLoading, setPrefillLoading] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isEdit) return;

    let alive = true;
    (async () => {
      try {
        setPrefillLoading(true);
        setError('');
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        if (!alive) return;
        setTitle(data.title ?? '');
        setPrice(data.price != null ? String(data.price) : '');
        setDescription(data.description ?? '');
        setCategory(data.category ?? '');
      } catch (e) {
        if (alive) setError('Failed to load product for editing.');
        console.error(e);
      } finally {
        if (alive) setPrefillLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const payload = {
      title,
      price: parseFloat(price),
      description,
      category,
      image: 'https://via.placeholder.com/150',
    };

    try {
      if (isEdit) {
        await axios.put(`https://fakestoreapi.com/products/${id}`, payload);
        setSuccess('Product updated! (Note: FakeStoreAPI changes do not persist.)');
      } else {
        await axios.post('https://fakestoreapi.com/products', payload);
        setSuccess('Product created! (Note: FakeStoreAPI does not persist new products.)');
        setTitle('');
        setPrice('');
        setDescription('');
        setCategory('');
      }
    } catch (e) {
      setError(isEdit ? 'Failed to update product.' : 'Failed to create product.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (prefillLoading) {
    return (
      <Container className="py-4" style={{ maxWidth: 480 }}>
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" role="status" />
          <span>Loading product…</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-3">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
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
          {loading ? <Spinner animation="border" size="sm" /> : (isEdit ? 'Save Changes' : 'Add Product')}
        </Button>
      </Form>
    </Container>
  );
}

export default ProductForm;