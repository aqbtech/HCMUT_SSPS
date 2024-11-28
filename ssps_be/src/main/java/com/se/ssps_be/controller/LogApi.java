package com.se.ssps_be.controller;

import com.se.ssps_be.dto.LogLine;
import com.se.ssps_be.service.LogService;
import com.se.ssps_be.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/log")
@RequiredArgsConstructor
public class LogApi {
	private final LogService logService;
	@GetMapping("/all-logs")
	public ResponseEntity<?> getAllLogs(@RequestHeader(value = "Authorization") String authorizationHeader,
										@RequestParam(value = "page", defaultValue = "0") int page,
										@RequestParam(value = "size", defaultValue = "10") int size) {
		String jwtToken = authorizationHeader.startsWith("Bearer ")
				? authorizationHeader.substring(7)
				: authorizationHeader;

		// Lấy subject từ token
		String username = JwtUtils.extractSubject(jwtToken);
		if (!username.equals("admin")) {
			return ResponseEntity.badRequest().body("You are not authorized to access this resource");
		}
		Page<LogLine> logs = logService.getAllLogs(page, size);
		return ResponseEntity.ok(logs);
	}
	@GetMapping("/log")
	public ResponseEntity<Page<LogLine>> getLog(@RequestHeader(value = "Authorization") String authorizationHeader,
												@RequestParam(value = "page", defaultValue = "0") int page,
												@RequestParam(value = "size", defaultValue = "10") int size) {
		String jwtToken = authorizationHeader.startsWith("Bearer ")
				? authorizationHeader.substring(7)
				: authorizationHeader;

		// Lấy subject từ token
		String username = JwtUtils.extractSubject(jwtToken);
		Page<LogLine> log = logService.getLogForStudent(username, page, size);
		return ResponseEntity.ok(log);
	}
}
