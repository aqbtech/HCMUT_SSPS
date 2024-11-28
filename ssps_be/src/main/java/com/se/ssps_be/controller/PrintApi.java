package com.se.ssps_be.controller;

import com.se.ssps_be.dto.PrintRequest;
import com.se.ssps_be.service.PrintService;
import com.se.ssps_be.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.web.header.Header;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/print")
@RequiredArgsConstructor
public class PrintApi {
	private final PrintService printService;
	@PostMapping("/create")
	public ResponseEntity<?> doPrint(
			@RequestHeader(value = "Authorization") String authorizationHeader,
			@RequestBody PrintRequest printRequest) {
		String jwtToken = authorizationHeader.startsWith("Bearer ")
				? authorizationHeader.substring(7)
				: authorizationHeader;

		// Lấy subject từ token
		String username = JwtUtils.extractSubject(jwtToken);

		printService.printDocument(username, printRequest);

		return ResponseEntity.ok().build();
	}

}
