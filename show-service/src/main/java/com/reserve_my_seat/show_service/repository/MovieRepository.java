package com.reserve_my_seat.show_service.repository;

import com.reserve_my_seat.show_service.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
