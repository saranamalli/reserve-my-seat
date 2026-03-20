package com.reserve_my_seat.show_service.service;

import com.reserve_my_seat.show_service.entity.Movie;
import com.reserve_my_seat.show_service.entity.Show;
import com.reserve_my_seat.show_service.entity.Theatre;

import java.util.List;
import java.util.Map;

public interface MovieService {
    List<Movie> getAllMovies();

    Map<Theatre, List<Show>> getTheatresForMovie(Long movieId);
}
