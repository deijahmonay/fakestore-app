import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import HomePage from './components/HomePage.jsx';
import Products from './components/Products.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import ProductForm from './components/ProductForm.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<ProductForm mode="add" />} />
        <Route path="/products/:id/edit" element={<ProductForm mode="edit" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;