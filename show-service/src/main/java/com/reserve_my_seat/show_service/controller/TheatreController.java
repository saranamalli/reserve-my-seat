package com.reserve_my_seat.show_service.controller;

import com.reserve_my_seat.show_service.entity.Show;
import com.reserve_my_seat.show_service.entity.Theatre;
import com.reserve_my_seat.show_service.service.ShowService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/theatres")
public class TheatreController {

    @Autowired
    private final ShowService showService;

    @GetMapping()
    public Map<Theatre, List<Show>> getTheatresForMovie(@RequestParam("movieId") Long movieId) {
        return showService.getTheatresForMovie(movieId);
    }
}
