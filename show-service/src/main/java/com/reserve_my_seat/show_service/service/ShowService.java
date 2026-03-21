package com.reserve_my_seat.show_service.service;

import com.reserve_my_seat.show_service.entity.Show;
import com.reserve_my_seat.show_service.entity.Theatre;

import java.util.List;
import java.util.Map;

public interface ShowService {
    Map<Theatre, List<Show>> getTheatresForMovie(Long movieId);
}
