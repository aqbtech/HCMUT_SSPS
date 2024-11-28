package com.se.ssps_be.service;

import com.se.ssps_be.dto.PrintRequest;

public interface PrintService {
	void printDocument(String token, PrintRequest printRequest);
}
