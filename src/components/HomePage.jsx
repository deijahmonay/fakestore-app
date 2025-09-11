import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function HomePage() {
  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm text-center" style={{ maxWidth: 640 }}>
        <Card.Body className="p-4">
          <h1 className="h2 mb-2">Welcome to FakeAPIStore</h1>
          <p className="text-muted mb-4">
            Browse products, view details, and practice create/update/delete with the FakeStore API.
          </p>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/products" className="btn btn-primary">
              View Products
            </Link>
            <Link to="/add-product" className="btn btn-outline-secondary">
              Add Product
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HomePage;
