package com.grocerybooking.grocery_backend.controller;


import com.grocerybooking.grocery_backend.model.Booking;
import com.grocerybooking.grocery_backend.service.BookingItemRequest;
import com.grocerybooking.grocery_backend.service.BookingService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) { this.bookingService = bookingService; }

    // place booking: user is derived from JWT (Authentication principal)
    @PostMapping
    public Booking placeBooking(@RequestBody @jakarta.validation.Valid List<@jakarta.validation.Valid BookingItemRequest> items, Authentication authentication) {
        String username = authentication.getName();
        return bookingService.placeBooking(username, items);
    }

    // get bookings for logged-in user
    @GetMapping("/me")
    public List<Booking> myBookings(Authentication authentication) {
        String username = authentication.getName();
        return bookingService.getBookingsForUser(username);
    }

    // admin: get all bookings (requires role check if needed)
    @GetMapping
    public List<Booking> allBookings() {
        return bookingService.getAllBookings();
    }
}

