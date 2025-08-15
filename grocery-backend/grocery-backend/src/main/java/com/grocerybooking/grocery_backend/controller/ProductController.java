package com.grocerybooking.grocery_backend.controller;

import com.grocerybooking.grocery_backend.model.Product;
import com.grocerybooking.grocery_backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLConnection;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // allow React frontend
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // ✅ Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // ✅ Get product by ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // ✅ Create product WITH optional image
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Product> addProduct(
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam Double price,
            @RequestParam int stock,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {

        Product product = new Product();
        product.setName(name);
        product.setCategory(category);
        product.setPrice(price);
        product.setStock(stock);

        if (image != null && !image.isEmpty()) {
            product.setImage(image.getBytes());
        }

        Product saved = productService.saveProduct(product);
        return ResponseEntity.ok(saved);
    }

    // ✅ Update product WITH optional new image
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam Double price,
            @RequestParam int stock,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {

        Product existingProduct = productService.getProductById(id);
        if (existingProduct == null) {
            return ResponseEntity.notFound().build();
        }

        existingProduct.setName(name);
        existingProduct.setCategory(category);
        existingProduct.setPrice(price);
        existingProduct.setStock(stock);

        // If a new image is provided, replace the old one
        if (image != null && !image.isEmpty()) {
            existingProduct.setImage(image.getBytes());
        }

        Product updated = productService.saveProduct(existingProduct);
        return ResponseEntity.ok(updated);
    }

    // ✅ Get product image by ID
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getProductImage(@PathVariable Long id) throws IOException {
        Product product = productService.getProductById(id);

        if (product == null || product.getImage() == null) {
            return ResponseEntity.notFound().build();
        }

        // Detect file type
        String contentType = URLConnection.guessContentTypeFromStream(
                new ByteArrayInputStream(product.getImage())
        );
        if (contentType == null) {
            contentType = "application/octet-stream"; // fallback
        }

        return ResponseEntity
                .ok()
                .header("Content-Type", contentType)
                .body(product.getImage());
    }

    // ✅ Delete product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
