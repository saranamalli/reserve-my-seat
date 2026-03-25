package com.reserve_my_seat.profile_service.service;

import com.reserve_my_seat.profile_service.dto.request.UserDetailsForRegistrationReq;
import com.reserve_my_seat.profile_service.entity.Gender;
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

    public void register(UserDetailsForRegistrationReq userDetails) {
        if(!userDetails.password().equals(userDetails.repassword()))
            throw new IllegalArgumentException("Passwords don't match!!");

        if(userRepository.existsByEmail(userDetails.email()))
            throw new RuntimeException("Email already Registered!!");

        User user = User.builder()
                .name(userDetails.name())
                .email(userDetails.email())
                .mobileNo(userDetails.mobileNo())
                .dob(userDetails.dob())
                .password(passwordEncoder.encode(userDetails.password()))
                .build();

        try {
            user.setGender(Gender.valueOf(userDetails.gender().toUpperCase()));
        } catch (IllegalArgumentException exception) {
            throw new RuntimeException("Invalid gender value provided");
        }

        userRepository.save(user);
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
