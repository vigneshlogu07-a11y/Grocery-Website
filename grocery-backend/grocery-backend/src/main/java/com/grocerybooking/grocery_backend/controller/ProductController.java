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

    // Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Get product by ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // Create product without image
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    // Upload product with image (multipart)
    @PostMapping(path = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<String> uploadProduct(
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam Double price,
            @RequestParam int stock,
            @RequestParam MultipartFile image) throws IOException {

        Product product = new Product();
        product.setName(name);
        product.setCategory(category);
        product.setPrice(price);
        product.setStock(stock);
        product.setImage(image.getBytes());

        productService.saveProduct(product);
        return ResponseEntity.ok("Product uploaded successfully!");
    }

    // Get product image by ID
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

    // Delete product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
