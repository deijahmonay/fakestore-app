# FakeStore E-Commerce App

A React + Vite project for practicing front-end development with the FakeStoreAPI. This app lets users view, add, edit, and delete products using API calls, with a modern UI powered by React Bootstrap.

Note: FakeStoreAPI is a mock. POST, PUT, and DELETE return success, but changes do not persist

## Features
- Home page with welcome message and navigation
- Product listing page with images, titles, prices, and details
- Product details page with full info, edit, and delete options
- Add product form (POST to API)
- Edit product form (PUT to API)
- Delete product with confirmation modal (DELETE to API)
- Responsive design using React Bootstrap
- Loading and error handling for all API calls
- 404 Not Found page for invalid routes

## Technologies Used
- React
- Vite
- React Router
- Axios
- React Bootstrap
- Bootstrap 5
- HTML
- CSS

## API Info
- [FakeStoreAPI](https://fakestoreapi.com/) used for all product information.
- POST, PUT, DELETE requests will return success, but changes do not stay (API is only for testing - no permananet).

## Project Structure
```
src/
  App.jsx
  index.css
  main.jsx
  components/
    HomePage.jsx
    NavBar.jsx
    Products.jsx
    ProductDetails.jsx
    ProductForm.jsx
    NotFound.jsx
public/
  ...
```

## Created By: 
Deijah Monay 📚
