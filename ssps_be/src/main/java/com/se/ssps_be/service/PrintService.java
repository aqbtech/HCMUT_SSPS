package com.se.ssps_be.service;

import com.se.ssps_be.dto.PrintRequest;
import com.se.ssps_be.entity.PrintState;

public interface PrintService {
	PrintState printDocument(String username, PrintRequest printRequest);
}
