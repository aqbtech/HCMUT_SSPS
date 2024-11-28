package com.se.ssps_be.controller;

import com.se.ssps_be.entity.PrintDevice;
import com.se.ssps_be.repo.PrintDeviceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/print-device")
@RequiredArgsConstructor
public class PrintDeviceApi {
	private final PrintDeviceRepo printDeviceRepo;
	@GetMapping("/all")
	public ResponseEntity<?> getAllPrintDevices() {
		List<PrintDevice> printDevices = printDeviceRepo.findAll();
		return ResponseEntity.ok(printDevices);
	}
	@PostMapping("/add-printer")
	public ResponseEntity<?> addPrinter(@RequestBody PrintDevice printDevice) {
		var savedPrinter = printDeviceRepo.save(printDevice);
		return ResponseEntity.ok(savedPrinter);
	}
	@PutMapping("/update-printer")
	public ResponseEntity<?> updatePrinter(@RequestBody PrintDevice printDevice) {
		var updatedPrinter = printDeviceRepo.save(printDevice);
		return ResponseEntity.ok(updatedPrinter);
	}
	@DeleteMapping("/delete-printer")
	public ResponseEntity<?> deletePrinter(@RequestParam Long id) {
		printDeviceRepo.deleteById(id);
		return ResponseEntity.ok().build();
	}

}
