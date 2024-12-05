package com.se.ssps_be.service.impl;

import com.se.ssps_be.dto.PrintRequest;
import com.se.ssps_be.entity.*;
import com.se.ssps_be.mapper.PrintJobMapper;
import com.se.ssps_be.repo.DocumentRepo;
import com.se.ssps_be.repo.PrintDeviceRepo;
import com.se.ssps_be.repo.PrintJobRepo;
import com.se.ssps_be.repo.StudentRepo;
import com.se.ssps_be.repository.SystemConfigRepository;
import com.se.ssps_be.service.LogService;
import com.se.ssps_be.service.PrintDevicePhysic;
import com.se.ssps_be.service.PrintService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrintImpl implements PrintService {
	private final DocumentRepo documentRepo;
	private final StudentRepo studentRepo;
	private final PrintJobRepo printJobRepo;
	private final LogService logService;
	private final PrintJobMapper printJobMapper;
	private final PrintDeviceRepo printDeviceRepo;
	private final PrintDevicePhysic printDevicePhysic;
	private final SystemConfigRepository systemConfigRepository;

	@Override
	@Transactional
	public PrintState printDocument(String username, PrintRequest printRequest) {
		// check balance remaining page of student compared to the number of pages of the document in the print job
		// do the print job log to console(for stimulation)
		// log the print job to db
		// update the balance remaining page of student
		Student student = studentRepo.findByUsername(username)
				.orElseThrow(() -> new RuntimeException("Student not found"));
		Document document = documentRepo.findById(printRequest.getDocsId())
				.orElseThrow(() -> new RuntimeException("Document not found"));
		PrintDevice printDevice = printDeviceRepo.findById(printRequest.getPrintDeviceId())
				.orElseThrow(() -> new RuntimeException("Print device not found"));
		if(printDevice.getStatus().equals("disabled")){
			throw new IllegalArgumentException("This printer is not enabled");
		}
		PrintJob printJob = printJobMapper.toPrintJob(printRequest);

		// calculate balance of print request
		int printedPages = calculateA4PaperConsumption(printRequest, document);
		int balance = printRequest.getNumberOfCopies() * printedPages;
		if(document.getDeleted()){
			throw new IllegalArgumentException("Document is deleted");
		}

		printJob.setBalanceConsumed(balance);
		printJob.setDocument(document);
		printJob.setStudent(student);
		printJob.setPrintDevice(printDevice);
		printJob.setTotalPages(document.getTotalPages());
		printJob.setStartTime(LocalDateTime.now());
		LocalDateTime endTime = LocalDateTime.now().plusMinutes(document.getTotalPages());
		printJob.setEndTime(endTime);

		// call print device to stimulate print job and return print job state
		var state = printDevicePhysic.print(printJob);
		printJob.setState(state);
		// log the print job to db
		LogInfo logInfo = logService.createLogInfo(printJob);

		if (student.getRemainingBalance() < balance) {
			// print job failed
			printJob.setState(PrintState.NOT_ENOUGH_BALANCE);
//			throw new IllegalArgumentException("Not enough balance"); // TODOd: also log to db
		}
		printJob.setLogInfo(logInfo);
		printJob.setLogInfo(logInfo);
		printJobRepo.save(printJob);
		logService.saveLogInfo(logInfo);
		if (state != PrintState.PRINTED) {
			return state;
		}
		student.setRemainingBalance(student.getRemainingBalance() - balance);
		studentRepo.save(student);
		return state;
	}

	private int getPrintedPages(PrintRequest printRequest, Document document) {
		// Lấy số trang dựa trên phạm vi trang được chọn
		int printedPages = switch (printRequest.getPageRange()) {
			case "all" -> document.getTotalPages();
			case "even" -> (int) Math.ceil(document.getTotalPages() / 2.0); // Trang chẵn
			case "odd" -> (int) Math.ceil((document.getTotalPages() + 1) / 2.0); // Trang lẻ
			case "custom" -> printRequest.getMax() - printRequest.getMin() + 1; // Phạm vi tùy chọn
			default -> throw new IllegalArgumentException("Not supported page range");
		};

		if (printedPages <= 0) {
			throw new IllegalArgumentException("Invalid page range");
		}
		return printedPages;
	}

	private int calculateA4PaperConsumption(PrintRequest printRequest, Document document) {
		// Số trang thực tế cần in
		int printedPages = getPrintedPages(printRequest, document);

		// Tính số tờ giấy cần dùng theo khổ giấy
		int sheetsNeeded = printRequest.getPageType().equals("double")
				? (int) Math.ceil((double) printedPages / 2) // Double-sided: mỗi tờ chứa 2 trang
				: printedPages; // Single-sided: mỗi tờ chứa 1 trang

		// Quy đổi số tờ giấy này về số trang A4 tiêu hao
		int a4PagesPerSheet = switch (printRequest.getPaperSize()) {
			case A1 -> 16; // A1 = 16 trang A4
			case A2 -> 8;  // A2 = 8 trang A4
			case A3 -> 4;  // A3 = 4 trang A4
			case A4 -> 1;  // A4 = 1 trang A4
			case A5 -> 1 / 2; // A5 = 1/2 trang A4
			default -> throw new IllegalStateException("Unexpected paper size: " + printRequest.getPaperSize());
		};

		// Tổng số trang A4 tiêu hao
		return sheetsNeeded * a4PagesPerSheet;
	}


}