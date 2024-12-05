package com.se.ssps_be.service.impl;

import com.se.ssps_be.dto.LogLine;
import com.se.ssps_be.entity.LogInfo;
import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.entity.Student;
import com.se.ssps_be.mapper.PrintJob2Log;
import com.se.ssps_be.repo.LogInfoRepo;
import com.se.ssps_be.repo.StudentRepo;
import com.se.ssps_be.service.LogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class Logger implements LogService {
	private final LogInfoRepo logInfoRepo;
	private final StudentRepo studentRepo;
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
	private final PrintJob2Log printJob2Log;
	@Override
	public Page<LogLine> getLogForStudent(String username, int page, int size) {
		Student student = studentRepo.findStudentByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("Student not found"));
		List<PrintJob> printJobs = student.getPrintJob();

		// Xác định index bắt đầu và kết thúc của phần tử trong trang
		int start = Math.min(page * size, printJobs.size());
		int end = Math.min((page + 1) * size, printJobs.size());

		// Cắt danh sách theo trang
		List<PrintJob> pagedPrintJobs = printJobs.subList(start, end);

		// Tạo Page từ danh sách đã cắt
		Page<PrintJob> printJobsPage = new PageImpl<>(pagedPrintJobs, PageRequest.of(page, size), printJobs.size());

		return printJob2Log.toLogLinePage(printJobsPage);
	}


	@Override
	public Page<LogLine> getAllLogs(int page, int size) {
		return null;
	}
}
