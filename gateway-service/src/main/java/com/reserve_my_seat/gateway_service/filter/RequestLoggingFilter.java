package com.reserve_my_seat.gateway_service.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

@Component
public class RequestLoggingFilter implements GlobalFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        ServerHttpRequest request = exchange.getRequest();

        log.info("Incoming Request → Method: {}, Path: {}",
                request.getMethod(),
                request.getURI());

        return chain.filter(exchange).then(
                Mono.fromRunnable(() -> {
                    log.info("Response Status → {}",
                            exchange.getResponse().getStatusCode());
                })
        );
    }
}
