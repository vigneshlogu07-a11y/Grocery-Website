package com.grocerybooking.grocery_backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // who placed the booking
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // items in the booking
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<BookingItem> items;

    private double totalAmount;

    private LocalDateTime createdAt = LocalDateTime.now();

    private String status = "PLACED"; // PLACED, CANCELLED, DELIVERED etc.
}

