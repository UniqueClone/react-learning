import { createContext, useContext, useReducer, ReactNode } from 'react';
import './index.css';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 29 },
  { id: 3, name: 'Keyboard', price: 79 },
  { id: 4, name: 'Monitor', price: 299 },
];

function ProductList() {
  const handleAddToCart = (product: Product) => {
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      {PRODUCTS.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p className="price">${product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

function CartSummary() {
  const handleRemove = (id: number) => {
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
  };

  const handleClearCart = () => {
  };

  return (
    <div className="cart-summary">
      <h2>Shopping Cart</h2>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <h1>Shopping Cart with Context + Reducer</h1>
      <div className="container">
        <ProductList />
        <CartSummary />
      </div>
    </div>
  );
}
