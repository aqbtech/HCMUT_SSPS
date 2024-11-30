package com.se.ssps_be.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	private final String[] PUBLIC_URLS = {
			"/",
			"/home/**",
			"/api/**",
	};
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
				.httpBasic(Customizer.withDefaults())
				.csrf((csrf) -> csrf
						.ignoringRequestMatchers("/api/**")); // TODO: ignore CSRF for API
		httpSecurity.authorizeHttpRequests(authorizeRequests
								-> authorizeRequests
								.requestMatchers(PUBLIC_URLS)
								.permitAll()
								.anyRequest()
								.authenticated()
//								.permitAll() // TODO: authenticate but allow static resources to use thymeleaf
				);
		httpSecurity.cors(cors -> cors.configurationSource(request -> {
			CorsConfiguration corsConfig = new CorsConfiguration();
			corsConfig.addAllowedOrigin("http://localhost:5173");
			corsConfig.addAllowedMethod("*");
			corsConfig.addAllowedHeader("*");
			return corsConfig;
		}));
		return httpSecurity.build();
	}
}
