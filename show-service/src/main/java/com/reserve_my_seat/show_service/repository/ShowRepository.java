package com.reserve_my_seat.show_service.repository;

import com.reserve_my_seat.show_service.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShowRepository extends JpaRepository<Show, Long> {
    @Query("select sh from Show sh join fetch sh.screen join fetch sh.screen.theatre where sh.movieId=:movieId")
    List<Show> findByMovieId(@Param("movieId") Long movieId);

//    @Query("select sh.* from shows sh where sh.")
//    List<Show> findByScreen_Theatre_Id(Long theatreId);
}
