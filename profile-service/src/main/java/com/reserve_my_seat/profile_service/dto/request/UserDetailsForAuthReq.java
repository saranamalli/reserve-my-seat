package com.reserve_my_seat.profile_service.dto.request;

import jakarta.validation.constraints.NotBlank;

public record UserDetailsForAuthReq(
        @NotBlank(message = "Email cannot be Blank!")
        String email,

        @NotBlank(message = "Password cannot be Blank!")
        String password
) {}
