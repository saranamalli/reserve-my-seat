package com.reserve_my_seat.show_service.controller;

import com.reserve_my_seat.show_service.entity.Movie;
import com.reserve_my_seat.show_service.entity.Show;
import com.reserve_my_seat.show_service.entity.Theatre;
import com.reserve_my_seat.show_service.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping()
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping(path = "/{movieId}/theatres")
    public Map<Theatre, List<Show>> getTheatresForMovie(@PathVariable("movieId") Long movieId) {
        return movieService.getTheatresForMovie(movieId);
    }
}
