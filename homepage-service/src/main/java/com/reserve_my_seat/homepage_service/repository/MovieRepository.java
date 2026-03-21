package com.reserve_my_seat.homepage_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reserve_my_seat.homepage_service.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long>{

}
