package com.se.ssps_be.service.impl;

import com.se.ssps_be.dto.PrintRequest;
import com.se.ssps_be.entity.*;
import com.se.ssps_be.mapper.PrintJobMapper;
import com.se.ssps_be.repo.DocumentRepo;
import com.se.ssps_be.repo.PrintDeviceRepo;
import com.se.ssps_be.repo.PrintJobRepo;
import com.se.ssps_be.repo.StudentRepo;
import com.se.ssps_be.service.LogService;
import com.se.ssps_be.service.PrintDevicePhysic;
import com.se.ssps_be.service.PrintService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

	@Override
	@Transactional
	public void printDocument(String token, PrintRequest printRequest) {
		// check balance remaining page of student compared to the number of pages of the document in the print job
		// do the print job log to console(for stimulation)
		// log the print job to db
		// update the balance remaining page of student
		Student student = studentRepo.findByUsername(token)
				.orElseThrow(() -> new RuntimeException("Student not found"));
		Document document = documentRepo.findById(printRequest.getDocsId())
				.orElseThrow(() -> new RuntimeException("Document not found"));
		PrintDevice printDevice = printDeviceRepo.findById(printRequest.getPrintDeviceId())
				.orElseThrow(() -> new RuntimeException("Print device not found"));
		PrintJob printJob = printJobMapper.toPrintJob(printRequest);

		// calculate balance of print request
		int printedPages = getPrintedPages(printRequest, document);
		int balance = printRequest.getNumberOfCopies() * printedPages;

		printJob.setBalanceConsumed(balance);
		printJob.setDocument(document);
		printJob.setStudent(student);
		printJob.setPrintDevice(printDevice);

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

		printJobRepo.save(printJob);
		logService.saveLogInfo(logInfo);
		if (state != PrintState.PRINTED) {
			return;
		}
		student.setRemainingBalance(student.getRemainingBalance() - balance);
		studentRepo.save(student);
	}

	private int getPrintedPages(PrintRequest printRequest, Document document) {
		int printedPages = switch (printRequest.getPageRange()) {
			case "all" -> document.getTotalPages();
			case "even" -> document.getTotalPages() % 2;
			case "odd" -> {
				int var1 = document.getTotalPages();
				yield var1 % 2 == 0 ? var1 / 2 : var1 / 2 + 1;
			}
			case "custom" -> printRequest.getMax() - printRequest.getMin() + 1;
			default -> throw new IllegalArgumentException("Not support page range");
		};
		if (printedPages <= 0) {
			throw new IllegalArgumentException("Invalid page range");
		}
		return printedPages;
	}
}
