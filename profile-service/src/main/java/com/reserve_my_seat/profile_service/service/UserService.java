package com.reserve_my_seat.profile_service.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.reserve_my_seat.profile_service.entity.User;
import com.reserve_my_seat.profile_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User not Found."));

        if(!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid Credentials.");
        }

        return user;
    }
}
