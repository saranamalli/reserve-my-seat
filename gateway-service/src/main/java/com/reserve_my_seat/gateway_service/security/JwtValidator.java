package com.reserve_my_seat.gateway_service.security;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtValidator {

    private final String SECRET = "niwyct98340q59-082313o82cbasvsgs";

    public Claims validateToken(String token) {
        try {
            Claims claims = Jwts.parser()
                                .verifyWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
                                .build()
                                .parseSignedClaims(token)
                                .getPayload();
            return claims;
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token expired login again");
        } catch (Exception e) {
            throw new RuntimeException("Invalid JWT");
        }
    }
}
