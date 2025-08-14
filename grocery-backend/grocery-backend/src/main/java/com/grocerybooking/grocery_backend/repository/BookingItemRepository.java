package com.grocerybooking.grocery_backend.repository;

import com.grocerybooking.grocery_backend.model.BookingItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingItemRepository extends JpaRepository<BookingItem, Long> {
}

