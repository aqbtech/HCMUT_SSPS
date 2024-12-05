package com.se.ssps_be.controller;

import com.se.ssps_be.dto.DocsEle;
import com.se.ssps_be.dto.UpdateDocsNameReq;
import com.se.ssps_be.entity.Document;
import com.se.ssps_be.mapper.DocsMapper;
import com.se.ssps_be.repo.DocumentRepo;
import com.se.ssps_be.service.impl.DocumentProvider;
import com.se.ssps_be.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/document")
@RequiredArgsConstructor
public class DocumentApi {
	private final DocumentRepo documentRepo;
	private final DocumentProvider documentProvider;
	private final DocsMapper docsMapper;

	@GetMapping("/all-documents")
	public ResponseEntity<Page<DocsEle>> getAllDocuments(@RequestHeader(value = "Authorization") String authorizationHeader,
														 @RequestParam(value = "page", defaultValue = "0") int page,
														 @RequestParam(value = "size", defaultValue = "10") int size) {
		String jwtToken = authorizationHeader.startsWith("Bearer ")
				? authorizationHeader.substring(7)
				: authorizationHeader;
		String username = JwtUtils.extractSubject(jwtToken);
		Pageable pageable = PageRequest.of(page, size);
		Page<Document> documentPage = documentRepo.findByStudent_UsernameAndDeletedFalse(username, pageable);
		return ResponseEntity.ok(docsMapper.toDocsElePage(documentPage));
	}

	@PostMapping("/upload")
	public ResponseEntity<?> addDocument(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestParam(value = "file") MultipartFile file) throws IOException {
		String jwtToken = authorizationHeader.startsWith("Bearer ")
				? authorizationHeader.substring(7)
				: authorizationHeader;

		// Lấy subject từ token
		String username = JwtUtils.extractSubject(jwtToken);
		documentProvider.saveDocument(username, file);
		return ResponseEntity.ok(file.getOriginalFilename());
	}

	@PutMapping("/update-name")
	public ResponseEntity<?> updateDocument(@RequestHeader(value = "Authorization") String authorizationHeader,
											@RequestParam(value = "id") String id, @RequestBody UpdateDocsNameReq name) {
		String jwtToken = authorizationHeader.startsWith("Bearer ")
				? authorizationHeader.substring(7)
				: authorizationHeader;

		// Lấy subject từ token
		String username = JwtUtils.extractSubject(jwtToken);
		documentProvider.renameDocument(id, username, name.getName());
		return ResponseEntity.ok(id + name.getName());
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteDocument(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestParam String id) {
		String jwtToken = authorizationHeader.startsWith("Bearer ")
				? authorizationHeader.substring(7)
				: authorizationHeader;

		// Lấy subject từ token
		String username = JwtUtils.extractSubject(jwtToken);
		Document document = documentRepo.findById(Long.valueOf(id))
				.orElseThrow(() -> new RuntimeException("Document not found"));
		document.setDeleted(Boolean.TRUE);
		documentRepo.save(document);
		return ResponseEntity.ok(id);
	}

	@PostMapping("/download")
	public ResponseEntity<?> downloadDocument(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestParam String id) {
		String jwtToken = authorizationHeader.startsWith("Bearer ")
				? authorizationHeader.substring(7)
				: authorizationHeader;

		// Lấy subject từ token
		String username = JwtUtils.extractSubject(jwtToken);
//		documentProvider.downloadDocument(id, username);
		return ResponseEntity.ok(id);
	}

	@GetMapping("page-count")
	public ResponseEntity<?> getPageCount(@RequestHeader(value = "Authorization") String authorizationHeader,
										  @RequestParam(value = "docid") Long docId) {
		String jwtToken = authorizationHeader.startsWith("Bearer ")
				? authorizationHeader.substring(7)
				: authorizationHeader;

		// Lấy subject từ token
		String username = JwtUtils.extractSubject(jwtToken);

		return ResponseEntity.ok(documentProvider.getPageCount(docId, username));
	}
}
