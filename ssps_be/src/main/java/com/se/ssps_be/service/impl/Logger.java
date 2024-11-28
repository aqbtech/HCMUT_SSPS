package com.se.ssps_be.service.impl;

import com.se.ssps_be.dto.LogLine;
import com.se.ssps_be.entity.LogInfo;
import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.entity.Student;
import com.se.ssps_be.repo.LogInfoRepo;
import com.se.ssps_be.service.LogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class Logger implements LogService {
	private final LogInfoRepo logInfoRepo;
	@Override
	public LogInfo createLogInfo(PrintJob printJob) {
		// date mssv name file name printer place number of copy status
		// 2021-09-01 10:00:00 2210001 NguyenVanA test.pdf sanh-H1 4 SUCCESS
		// 2021-09-01 10:00:00 2210001 NguyenVanA test.pdf sanh-H1 4 FAIL(not enough paper)
		LogInfo logInfo = new LogInfo();
		Date date = new Date();
		logInfo.setDate(date);
		logInfo.setPrintJob(printJob);
		return logInfo;
	}

	@Override
	public void saveLogInfo(LogInfo logInfo) {
		logInfoRepo.save(logInfo);
	}

	@Override
	public Page<LogLine> getLogForStudent(String token, int page, int size) {
		return null;
	}
}