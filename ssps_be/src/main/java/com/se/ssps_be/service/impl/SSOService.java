package com.se.ssps_be.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class SSOService {
    @Autowired
    private final WebClient webClient;
    public SSOService(WebClient webClient) {
        this.webClient = webClient;
    }

    public String callApiWithBearerToken(String name, String token) {
        String url = "http://localhost:8081/sso/users/my-info/" + name;

        try {
            return webClient.get()
                    .uri(url)
                    .header("Authorization", "Bearer " + token) // Truyền token
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(); // Blocking call
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

}
