import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Available Products</h2>
      <div className="row g-4">
        {products.map((p) => (
          <div className="col-md-3" key={p.id}>
            <ProductCard product={p} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
