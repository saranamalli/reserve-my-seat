package com.reserve_my_seat.homepage_service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.Map;

@SpringBootApplication
public class HomepageServiceApplication implements ApplicationRunner {

	@Autowired
	private StringRedisTemplate stringRedisTemplate;

	private final Logger logger = LoggerFactory.getLogger(HomepageServiceApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(HomepageServiceApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		stringRedisTemplate.opsForValue().set("test", "hello");
		logger.info("Redis communication successful: {}", Map.of("test", stringRedisTemplate.opsForValue().get("test")));
	}
}
