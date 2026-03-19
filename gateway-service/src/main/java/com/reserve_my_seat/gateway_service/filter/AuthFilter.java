package com.reserve_my_seat.gateway_service.filter;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.reserve_my_seat.gateway_service.security.JwtValidator;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class AuthFilter implements GlobalFilter {
    private static final Logger logger = LoggerFactory.getLogger(AuthFilter.class);
    private final JwtValidator jwtValidator;

    private static final List<String> PUBLIC_ENDPOINTS = List.of(
        "/api/profile/auth/register", "/auth/register",
        "/api/profile/auth/login", "/auth/login"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();
        logger.info("Received request to filter request: {}", Map.of("Path", path));
        //Skip public endpoints
        if(PUBLIC_ENDPOINTS.stream().anyMatch(path::contains)) {
            logger.info("Detected the request as Public endpoint: {}", Map.of("Path", path));
            return chain.filter(exchange);
        }

        String authHeader = exchange.getRequest()
                                .getHeaders()
                                .getFirst(HttpHeaders.AUTHORIZATION);

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing Authorization Header");
        }

        String token = authHeader.substring(7);
        Claims claims = jwtValidator.validateToken(token);
        String userName = claims.get("Username", String.class);


        // Add user info to downstream services
        ServerHttpRequest mutatedHttpRequest = exchange.getRequest().mutate()
                                                    .header("X-User-Email", claims.getSubject())
                                                    .header("X-User-Name", userName)
                                                    .build();

        return chain.filter(exchange.mutate().request(mutatedHttpRequest).build());
    }
}
