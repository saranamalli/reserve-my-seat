package com.reserve_my_seat.show_service.service.implementation;

import com.reserve_my_seat.show_service.entity.Movie;
import com.reserve_my_seat.show_service.entity.Show;
import com.reserve_my_seat.show_service.entity.Theatre;
import com.reserve_my_seat.show_service.repository.MovieRepository;
import com.reserve_my_seat.show_service.repository.ShowRepository;
import com.reserve_my_seat.show_service.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final ShowRepository showRepository;

    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Map<Theatre, List<Show>> getTheatresForMovie(Long movieId) {
        List<Show> shows = showRepository.findByMovieId(movieId);
        return shows.stream().collect(
                Collectors.groupingBy(show -> show.getScreen().getTheatre())
        );
    }
}
