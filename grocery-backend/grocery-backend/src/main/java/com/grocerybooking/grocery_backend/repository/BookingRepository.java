package com.grocerybooking.grocery_backend.repository;

import com.grocerybooking.grocery_backend.model.Booking;
import com.grocerybooking.grocery_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
}
