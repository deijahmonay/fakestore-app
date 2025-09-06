import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        if (alive) setProduct(data);
      } catch (err) {
        if (alive) setError('Failed to load product. Please try again.');
        console.error(err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  const handleDelete = () => {
    setDeleting(true);
    axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setShowModal(false);
        navigate('/products'); 
      })
      .catch((err) => {
        setError('Delete failed. Please try again.');
        console.error(err);
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" role="status" />
          <span>Loading product…</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger" className="mb-3">{error}</Alert>
        <Button as={Link} to="/products" variant="outline-secondary">Back to Products</Button>
      </Container>
    );
  }

  if (!product) return null;

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <div className="ratio ratio-4x3 bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid w-100 h-100 p-3"
            style={{ objectFit: 'contain' }}
          />
        </div>

        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h1 className="h4 m-0">{product.title}</h1>
    <Badge bg="secondary" className="text-capitalize">{product.category}</Badge>
          </div>

          <p className="text-muted">{product.description}</p>

          <div className="d-flex align-items-center justify-content-between">
            <div className="fw-semibold fs-5">${Number(product.price).toFixed(2)}</div>
            <div className="d-flex gap-2">
              <Button as={Link} to={`/products/${id}/edit`} variant="outline-secondary">
                Edit
              </Button>
              <Button variant="danger" onClick={() => setShowModal(true)}>
                Delete
              </Button>
              <Button as={Link} to="/products" variant="outline-primary">
                Back
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

  <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This uses a mock API. You’ll get a success response, but data won’t actually be removed.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting…' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductDetails;
