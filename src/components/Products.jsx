import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not fetch products.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger mt-4 text-center">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Products</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={product.image} alt={product.title} className="card-img-top p-3 bg-white" style={{ height: 140, objectFit: 'contain' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title" style={{ fontSize: '1rem' }}>{product.title}</h5>
                <p className="card-text fw-bold">${product.price}</p>
                <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm mt-auto">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

