package com.reserve_my_seat.profile_service.controller;

import com.reserve_my_seat.profile_service.dto.UserDetailsForAuth;
import com.reserve_my_seat.profile_service.dto.UserToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reserve_my_seat.profile_service.entity.User;
import com.reserve_my_seat.profile_service.security.JwtUtils;
import com.reserve_my_seat.profile_service.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;


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
    public ResponseEntity<UserToken> loginUser(@RequestBody User request) {
        logger.info("Received request to Login User {}", request);
        User user = userService.login(request.getEmail(), request.getPassword());
        String token = jwtUtils.generateToken(user.getEmail(), user.getName());
        return ResponseEntity.ok(new UserToken(new UserDetailsForAuth(user.getName(), user.getEmail()), token));
    }   

    @GetMapping("/test-protected-route")
    public String testProtectedRoute(@RequestHeader("X-User-Email") String email, @RequestHeader("X-User-Name") String username) {
        return String.format("Hi! your Jwt Token is validated: %s", Map.of("User Email", email, "Username", username));
    }
}
