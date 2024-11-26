package com.se.ssps_be.service;

import com.se.ssps_be.entity.DocsType;
import org.springframework.web.multipart.MultipartFile;

public interface DocumentService {
	void saveDocument(String fileName, DocsType docsType, MultipartFile file);
}
