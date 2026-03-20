package com.reserve_my_seat.show_service.repository;

import com.reserve_my_seat.show_service.entity.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TheatreRepository extends JpaRepository<Theatre, Long> {
}
