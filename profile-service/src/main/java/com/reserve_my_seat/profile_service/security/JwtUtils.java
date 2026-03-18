package com.reserve_my_seat.profile_service.security;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

    private final static String SECRET = "niwyct98340q59-082313o82cbasvsgs";

    public String generateToken(String email, String userName) {
        return Jwts.builder()
                .subject(email)
                .claim("Username", userName)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .compact();
    }
}
