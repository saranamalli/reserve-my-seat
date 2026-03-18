package com.reserve_my_seat.profile_service.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reserve_my_seat.profile_service.entity.User;
import com.reserve_my_seat.profile_service.security.JwtUtils;
import com.reserve_my_seat.profile_service.service.UserService;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserService userService;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        logger.info("Received request to Register User {}", user);
        return userService.register(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User request) {
        logger.info("Received request to Login User {}", request);
        User user = userService.login(request.getEmail(), request.getPassword());
        return jwtUtils.generateToken(user.getEmail(), user.getName());
    }   
}
