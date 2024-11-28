package com.se.ssps_be.controller;

import com.se.ssps_be.dto.LogLine;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/log")
public class LogApi {
	@GetMapping("/all-logs")
	public ResponseEntity<?> getAllLogs() {
		List<LogLine> logs = new ArrayList<>();
		return ResponseEntity.ok(logs);
	}
}
