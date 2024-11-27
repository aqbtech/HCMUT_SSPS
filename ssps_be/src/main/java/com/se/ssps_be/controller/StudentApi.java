package com.se.ssps_be.controller;

import com.se.ssps_be.entity.Student;
import com.se.ssps_be.mapper.StudentMapper;
import com.se.ssps_be.repo.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
@RequiredArgsConstructor
public class StudentApi {
	private final StudentRepo studentRepo;
	private final StudentMapper studentMapper;

	@GetMapping("/all")
	public ResponseEntity<?> getAllStudents() {
		List<Student> students = studentRepo.findAll().stream().map(studentMapper::toDTO).toList();
		return ResponseEntity.ok(students);
	}

	@PostMapping("/add-student")
	public ResponseEntity<?> addStudent(@RequestBody Student student) {
		var savedStudent = studentRepo.save(student);
		return ResponseEntity.ok(savedStudent);
	}

	@PutMapping("/update-student")
	public ResponseEntity<?> updateStudent(@RequestBody Student student) {
		var updatedStudent = studentRepo.save(student);
		return ResponseEntity.ok(updatedStudent);
	}

	@DeleteMapping("/delete-student")
	public ResponseEntity<?> deleteStudent(@RequestParam String id) {
		studentRepo.deleteById(Long.parseLong(id));
		return ResponseEntity.ok().build();
	}
}
