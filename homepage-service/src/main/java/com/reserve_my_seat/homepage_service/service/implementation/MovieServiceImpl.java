package com.reserve_my_seat.homepage_service.service.implementation;

import java.util.List;

import com.reserve_my_seat.homepage_service.entity.Movie;
import com.reserve_my_seat.homepage_service.repository.MovieRepository;
import com.reserve_my_seat.homepage_service.service.MovieService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService{

    private final MovieRepository movieRepository;

    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
}
