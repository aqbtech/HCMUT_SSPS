package com.se.ssps_be.service.impl;


import com.se.ssps_be.entity.DocsType;
import com.se.ssps_be.service.DocumentService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class WordDocProvider implements DocumentService {
	@Override
	public void saveDocument(String fileName, DocsType docsType, MultipartFile file) {

	}
}
