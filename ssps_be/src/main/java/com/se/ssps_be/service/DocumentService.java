package com.se.ssps_be.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DocumentService {
	void saveDocument(String username, MultipartFile file) throws IOException;
	void renameDocument(String id, String name);
}
