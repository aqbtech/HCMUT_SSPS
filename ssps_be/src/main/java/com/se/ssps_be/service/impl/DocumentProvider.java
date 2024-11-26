package com.se.ssps_be.service.impl;

import com.se.ssps_be.entity.DocsType;
import com.se.ssps_be.entity.PdfDocs;
import com.se.ssps_be.entity.WordDocs;
import com.se.ssps_be.repo.DocumentRepo;
import com.se.ssps_be.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class DocumentProvider implements DocumentService {
	private final DocumentRepo documentRepo;

	@Override
	public void saveDocument(String username, MultipartFile file) throws IOException {
		if (Objects.equals(file.getContentType(), "application/pdf")) {
			var docs = PdfDocs.builder();
			docs.name(file.getOriginalFilename());
			docs.content(file.getBytes());
			docs.extension("pdf");
			docs.type(DocsType.PDF);
			documentRepo.save(docs.build());
		} else if (Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
			var docs = WordDocs.builder();
			docs.name(file.getOriginalFilename());
			docs.content(file.getBytes());
			docs.fileType("docx");
			docs.type(DocsType.WORD);
			documentRepo.save(docs.build());
		} else {
			throw new IllegalArgumentException("Invalid file type");
		}
	}

	@Override
	public void renameDocument(String id, String name) {
		var doc = documentRepo.findById(Long.parseLong(id)).orElseThrow();
		doc.setName(name);
		documentRepo.save(doc);
	}
}
