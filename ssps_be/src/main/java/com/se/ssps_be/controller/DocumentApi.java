package com.se.ssps_be.controller;

import com.se.ssps_be.dto.DocsEle;
import com.se.ssps_be.dto.UpdateDocsNameReq;
import com.se.ssps_be.mapper.DocsMapper;
import com.se.ssps_be.repo.DocumentRepo;
import com.se.ssps_be.service.impl.DocumentProvider;
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
	public ResponseEntity<Page<DocsEle>> getAllDocuments(@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "10") int size) {
		// must get username from token here
		Pageable pageable = PageRequest.of(page, size);
		var documents = documentRepo.findAll(pageable);
		return ResponseEntity.ok(docsMapper.toDocsElePage(documents));
	}

	@PostMapping("/upload")
	public ResponseEntity<?> addDocument(@RequestParam(value = "file") MultipartFile file) throws IOException {
		documentProvider.saveDocument("Bogart", file);
		return ResponseEntity.ok(file.getOriginalFilename());
	}

	@PutMapping("/update-name")
	public ResponseEntity<?> updateDocument(@RequestParam(value = "id") String id, @RequestBody UpdateDocsNameReq name) {
		documentProvider.renameDocument(id, name.getName());
		return ResponseEntity.ok(id + name.getName());
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteDocument(@RequestParam String id) {
		documentRepo.deleteById(Long.parseLong(id));
		return ResponseEntity.ok(id);
	}
}
