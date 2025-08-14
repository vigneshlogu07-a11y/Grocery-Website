package com.grocerybooking.grocery_backend.service;

import com.grocerybooking.grocery_backend.model.Booking;
import com.grocerybooking.grocery_backend.model.BookingItem;
import com.grocerybooking.grocery_backend.model.Product;
import com.grocerybooking.grocery_backend.model.User;
import com.grocerybooking.grocery_backend.repository.BookingRepository;
import com.grocerybooking.grocery_backend.repository.ProductRepository;
import com.grocerybooking.grocery_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository,
                          ProductRepository productRepository,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Booking placeBooking(String username, List<BookingItemRequest> itemsRequest) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        Set<BookingItem> items = new HashSet<>();
        double total = 0.0;

        for (BookingItemRequest bir : itemsRequest) {
            Product p = productRepository.findById(bir.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + bir.getProductId()));

            if (p.getStock() < bir.getQuantity()) {
                throw new RuntimeException("Not enough stock for product: " + p.getName());
            }

            // reduce stock
            p.setStock(p.getStock() - bir.getQuantity());
            productRepository.save(p);

            BookingItem bi = new BookingItem();
            bi.setProductId(p.getId());
            bi.setProductName(p.getName());
            bi.setPrice(p.getPrice());
            bi.setQuantity(bir.getQuantity());
            items.add(bi);

            total += p.getPrice() * bir.getQuantity();
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setItems(items);
        booking.setTotalAmount(total);
        // set bidirectional
        for (BookingItem bi : items) {
            bi.setBooking(booking);
        }

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsForUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepository.findByUser(user);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}

