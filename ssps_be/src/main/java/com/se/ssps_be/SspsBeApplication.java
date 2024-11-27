package com.se.ssps_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SspsBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(SspsBeApplication.class, args);
	}

}
