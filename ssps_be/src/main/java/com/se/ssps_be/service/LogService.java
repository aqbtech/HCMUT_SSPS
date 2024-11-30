package com.se.ssps_be.service;

import com.se.ssps_be.dto.LogLine;
import com.se.ssps_be.entity.LogInfo;
import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.entity.Student;
import org.springframework.data.domain.Page;

public interface LogService {
	LogInfo createLogInfo(PrintJob printJob);
	void saveLogInfo(LogInfo logInfo);
	Page<LogLine> getLogForStudent(String username, int page, int size);
	Page<LogLine> getAllLogs(int page, int size);
}
