package com.se.ssps_be.service.impl;

import com.se.ssps_be.entity.DocsType;
import com.se.ssps_be.entity.PdfDocs;
import com.se.ssps_be.entity.Student;
import com.se.ssps_be.entity.WordDocs;
import com.se.ssps_be.exception.ErrorCode;
import com.se.ssps_be.exception.WebServerException;
import com.se.ssps_be.repo.DocumentRepo;
import com.se.ssps_be.repo.StudentRepo;
import com.se.ssps_be.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class DocumentProvider implements DocumentService {
	private final DocumentRepo documentRepo;
	private final StudentRepo studentRepo;
	private int getPdfPageCount(byte[] pdfContent) throws IOException {
		try (PDDocument pdfDocument = PDDocument.load(pdfContent)) {
			return pdfDocument.getNumberOfPages();
		}
	}
	private int getWordPageCount(byte[] wordContent) throws IOException {
		try (XWPFDocument document = new XWPFDocument(new ByteArrayInputStream(wordContent))) {
			// Apache POI không cung cấp số trang trực tiếp. Dựa vào dữ liệu metadata:
			return document.getProperties().getExtendedProperties().getUnderlyingProperties().getPages();
		}
	}
	@Override
	public void saveDocument(String username, MultipartFile file) throws IOException {
		Student student = studentRepo.findStudentByUsername(username)
				.orElseThrow(()-> new IllegalArgumentException("Student not found"));
		if (Objects.equals(file.getContentType(), "application/pdf")) {
			var pdfContent = file.getBytes();
			var pdfPageCount = getPdfPageCount(pdfContent);
			var docs = PdfDocs.builder();
			docs.name(file.getOriginalFilename());
			docs.content(pdfContent);
			docs.extension("pdf");
			docs.totalPages(pdfPageCount);
			docs.type(DocsType.PDF);
			docs.deleted(Boolean.FALSE);
			docs.student(student);
			documentRepo.save(docs.build());
		} else if (Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
			var wordContent = file.getBytes();
			var wordPageCount = getWordPageCount(wordContent);
			var docs = WordDocs.builder();
			docs.name(file.getOriginalFilename());
			docs.content(file.getBytes());
			docs.fileType("docx");
			docs.totalPages(wordPageCount);
			docs.type(DocsType.WORD);
			docs.deleted(Boolean.FALSE);
			docs.student(student);
			documentRepo.save(docs.build());
		} else {
			throw new IllegalArgumentException("Invalid file type");
		}
	}

	@Override
	public void renameDocument(String id,String username, String name) {
		var doc = documentRepo.findByIdAndStudent_Username(Long.parseLong(id), username).orElseThrow();
		if(doc.getDeleted()){
			throw new IllegalArgumentException("Document is deleted");
		}
		doc.setName(name);
		documentRepo.save(doc);
	}

	@Override
	public void deleteDocument(String id, String username) {
		documentRepo.deleteByIdAndStudent_Username(Long.parseLong(id), username);
	}
	@Override
	public Integer getPageCount(Long docId, String username) {
		var doc = documentRepo.findByIdAndStudent_Username(docId, username)
				.orElseThrow(() -> new WebServerException(ErrorCode.DOCUMENT_NOT_FOUND));
		if(doc.getDeleted()){
			throw new IllegalArgumentException("Document is deleted");
		}
		return doc.getTotalPages();

	}
}