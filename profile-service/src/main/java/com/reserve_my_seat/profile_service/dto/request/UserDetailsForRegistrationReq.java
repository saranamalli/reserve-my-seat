package com.reserve_my_seat.profile_service.dto.request;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record UserDetailsForRegistrationReq(
        @NotBlank(message = "Name is Required!")
        String name,

        @Email(message = "Invalid Email Format!")
        @NotBlank(message = "Email is Required!")
        String email,

        @Pattern(regexp = "^\\d{10}$", message = "Mobile No must be 10 digits!")
        String mobileNo,

        @Size(min = 10, message = "Password must be atleast 10 characters!")
        String password,

        @NotBlank(message = "Please enter Confirm Password!")
        String repassword,

        @NotBlank(message = "Gender is Required!")
        String gender,

        @NotNull(message = "DoB is Required!")
        LocalDate dob
) {}
