package com.reserve_my_seat.profile_service.dto.response;


public record UserTokenRes(UserDetailsForAuthRes user, String token){}

