package com.reserve_my_seat.profile_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reserve_my_seat.profile_service.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByEmail(String email);

}
