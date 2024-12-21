package com.se.ssps_be.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.se.ssps_be.dto.request.BuyPagesRequest;
import com.se.ssps_be.dto.response.StudentInformationResponse;
import com.se.ssps_be.entity.Student;
import com.se.ssps_be.mapper.StudentMapper;
import com.se.ssps_be.repo.StudentRepo;
import com.se.ssps_be.service.fakeAPI.FakeAPI;
import com.se.ssps_be.service.impl.SSOService;
import com.se.ssps_be.utils.JwtUtils;
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
	private final SSOService ssoService;
	private final FakeAPI fakeAPI;

	@PostMapping("/buypages")
	public ResponseEntity<?> buyPages(@RequestHeader(value = "Authorization") String authorizationHeader,
								   @RequestBody BuyPagesRequest request){
		String jwtToken = authorizationHeader.startsWith("Bearer ")
				? authorizationHeader.substring(7)
				: authorizationHeader;

		// Lấy subject từ token
		String username = JwtUtils.extractSubject(jwtToken);
		String response = fakeAPI.buyPages(username, request);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAllStudents() {
		List<Student> students = studentRepo.findAll().stream().map(studentMapper::toDTO).toList();
		return ResponseEntity.ok(students);
	}

	@GetMapping("/information")
	public ResponseEntity<?> getInformation(@RequestHeader(value = "Authorization") String authorizationHeader) throws JsonProcessingException {
		String jwtToken = authorizationHeader.startsWith("Bearer ")
				? authorizationHeader.substring(7)
				: authorizationHeader;
		String username = JwtUtils.extractSubject(jwtToken);
		Student student = studentRepo.findByUsername(username)
				.orElseThrow(()-> new RuntimeException("Student not found"));
		String res1 = ssoService.callApiWithBearerToken(username, jwtToken);
		Student res2 = studentMapper.toDTO(student);
		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(res1);

		// Trích xuất các trường cụ thể
		String mssv = root.get("ms").asText();
		String lastName = root.get("lastName").asText();
		String firstName = root.get("firstName").asText();
		String dob = root.get("dob").asText();

		return ResponseEntity.ok(StudentInformationResponse.builder()
						.firstname(firstName)
						.dob(dob)
						.lastname(lastName)
						.mssv(mssv)
						.remainingBalance(res2.getRemainingBalance())
				.build());
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
