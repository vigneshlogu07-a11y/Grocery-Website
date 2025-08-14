package com.grocerybooking.grocery_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;  // ✅ Added back
    private Double price;
    private int stock;        // ✅ Added back

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image; // store image as byte array

    public Product() {}

    public Product(String name, String category, Double price, int stock, byte[] image) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.image = image;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }
    public byte[] getImage() { return image; }
    public void setImage(byte[] image) { this.image = image; }
}
