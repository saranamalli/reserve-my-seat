package com.reserve_my_seat.profile_service.controller;

import com.reserve_my_seat.profile_service.dto.request.UserDetailsForAuthReq;
import com.reserve_my_seat.profile_service.dto.response.UserDetailsForAuthRes;
import com.reserve_my_seat.profile_service.dto.request.UserDetailsForRegistrationReq;
import com.reserve_my_seat.profile_service.dto.response.UserTokenRes;
import jakarta.validation.Valid;
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
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserDetailsForRegistrationReq userDetails) {
        logger.info("Received request to Register User: {}", userDetails.name());
        userService.register(userDetails);
        return ResponseEntity.ok("User registered Successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<UserTokenRes> loginUser(@Valid @RequestBody UserDetailsForAuthReq request) {
        logger.info("Received request to Login User {}", request.email());
        User user = userService.login(request.email(), request.password());
        String token = jwtUtils.generateToken(user.getEmail(), user.getName());
        return ResponseEntity.ok(new UserTokenRes(new UserDetailsForAuthRes(user.getName(), user.getEmail()), token));
    }   

    @GetMapping("/test-protected-route")
    public String testProtectedRoute(@RequestHeader("X-User-Email") String email, @RequestHeader("X-User-Name") String username) {
        return String.format("Hi! your Jwt Token is validated: %s", Map.of("User Email", email, "Username", username));
    }
}
