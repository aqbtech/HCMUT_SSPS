package com.se.ssps_be.controller;

import com.se.ssps_be.dto.PrintRequest;
import com.se.ssps_be.service.PrintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/print")
@RequiredArgsConstructor
public class PrintApi {
	private final PrintService printService;
	@PostMapping("/create")
	public ResponseEntity<?> doPrint(@RequestBody PrintRequest printRequest) {
		printService.printDocument("Bogart", printRequest);
		return ResponseEntity.ok().build();
	}
}
