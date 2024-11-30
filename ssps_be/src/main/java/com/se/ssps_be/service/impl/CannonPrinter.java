package com.se.ssps_be.service.impl;

import com.se.ssps_be.entity.PrintDevice;
import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.entity.PrintState;
import com.se.ssps_be.repo.PrintDeviceRepo;
import com.se.ssps_be.service.PrintDevicePhysic;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CannonPrinter implements PrintDevicePhysic {
	private final PrintDeviceRepo printDeviceRepo;
	@Override
	public PrintState print(PrintJob printJob) {
		PrintDevice printDevice = printDeviceRepo.findById(printJob.getPrintDevice().getId())
				.orElse(null);
		if(printDevice == null) {
			return PrintState.PRINT_DEVICE_NOT_FOUND; // print device not found
		}
		printDevice.addPrintJob(printJob);
		// check status
		if(printDevice.getStatus().equals("offline")) {
			return PrintState.PRINT_DEVICE_OFFLINE; // print device is offline
		}
		// check ink
		if(!printDevice.isRemainingBlackInk()) {
			return PrintState.NOT_ENOUGH_INK; // not enough ink
		}
		// check support paper size
		if (!printDevice.getSupportedPaperSize().contains(printJob.getPaperSize())) {
			return PrintState.NOT_SUPPORTED_PAPER_SIZE; // not supported paper size
		}
		// check paper
		if (printDevice.getRemainingPage() < printJob.getBalanceConsumed()) {
			return PrintState.NOT_ENOUGH_PAPER; // not enough paper
		}
		// print
		printDevice.setRemainingPage(printDevice.getRemainingPage() - printJob.getBalanceConsumed());
		printDeviceRepo.save(printDevice);
		return PrintState.PRINTED;
	}
}
