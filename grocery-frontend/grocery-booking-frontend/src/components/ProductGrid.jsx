import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from './ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const res = await api.get('/products'); // GET /api/products
        if (mounted) setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetch();
    return () => mounted = false;
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;

  return (
    <div className="row g-4">
      {products.map(p => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
          <ProductCard product={p} onAdd={addToCart} />
        </div>
      ))}
    </div>
  );
}
