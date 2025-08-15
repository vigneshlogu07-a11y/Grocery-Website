import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const refreshProducts = () => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleShow = (product = null) => {
    if (product) {
      setEditId(product.id);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        image: null,
      });
    } else {
      setEditId(null);
      setFormData({ name: "", category: "", price: "", stock: "", image: null });
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    if (formData.image) data.append("image", formData.image);

    const request = editId
      ? axios.put(`http://localhost:8080/api/products/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : axios.post("http://localhost:8080/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

    request
      .then(() => {
        refreshProducts();
        handleClose();
        setToastMessage(editId ? "Product updated!" : "Product added!");
        setToastBg("success");
        setToastShow(true);
      })
      .catch(() => {
        setToastMessage("Action failed!");
        setToastBg("danger");
        setToastShow(true);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`http://localhost:8080/api/products/${id}`)
        .then(() => {
          refreshProducts();
          setToastMessage("Product deleted!");
          setToastBg("success");
          setToastShow(true);
        })
        .catch(() => {
          setToastMessage("Failed to delete product!");
          setToastBg("danger");
          setToastShow(true);
        });
    }
  };

  return (
    <div className="container my-5">
      {/* Toast Notifications */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setToastShow(false)}
          show={toastShow}
          delay={3000}
          autohide
          bg={toastBg === "success" ? "warning" : "danger"}
        >
          <Toast.Body className="text-dark fw-bold">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: "#212121" }}>Manage Products</h2>
        <Button
          style={{ backgroundColor: "#4CAF50", border: "none", transition: "0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          onClick={() => handleShow()}
        >
          <FaPlus /> Add Product
        </Button>
      </div>

      {/* Product Table */}
      <table className="table table-hover align-middle" style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", overflow: "hidden" }}>
        <thead style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Image</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr 
              key={p.id} 
              style={{ 
                background: index % 2 === 0 ? "linear-gradient(to right, #FFFFFF, #FFEB3B10)" : "#FFFFFF", 
                transition: "0.3s" 
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#FFEB3B20"}
              onMouseLeave={e => e.currentTarget.style.background = index % 2 === 0 ? "linear-gradient(to right, #FFFFFF, #FFEB3B10)" : "#FFFFFF"}
            >
              <td style={{ color: "#212121" }}>{p.name}</td>
              <td style={{ color: "#212121" }}>{p.category}</td>
              <td style={{ color: "#212121" }}>{p.price}</td>
              <td style={{ color: p.stock > 0 ? "#2e7d32" : "#FF9800" }}>{p.stock}</td>
              <td>
                {p.id && (
                  <img
                    src={`http://localhost:8080/api/products/${p.id}/image`}
                    alt={p.name}
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/60?text=No+Image")}
                  />
                )}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShow(p)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
          <Modal.Title>{editId ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "linear-gradient(to bottom, #FFFFFF, #F5FFF5)" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#F5F5F5" }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleSave}
            style={{ transition: "0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
