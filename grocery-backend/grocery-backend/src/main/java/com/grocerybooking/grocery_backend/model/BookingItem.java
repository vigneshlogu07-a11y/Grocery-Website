package com.grocerybooking.grocery_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "booking_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookingItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // snapshot of product at booking time
    private Long productId;
    private String productName;
    private double price;
    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    @JsonBackReference
    private Booking booking;
}

