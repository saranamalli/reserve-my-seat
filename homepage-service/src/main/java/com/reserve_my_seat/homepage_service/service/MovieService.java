package com.reserve_my_seat.homepage_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.reserve_my_seat.homepage_service.entity.Movie;

public interface MovieService {

    List<Movie> getAllMovies();
}
