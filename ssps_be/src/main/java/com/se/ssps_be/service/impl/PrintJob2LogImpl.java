package com.se.ssps_be.service.impl;

import com.se.ssps_be.dto.LogLine;
import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.mapper.PrintJob2Log;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class PrintJob2LogImpl implements PrintJob2Log {

	@Override
	public LogLine toLogLine(PrintJob printJob) {
		LogLine.LogLineBuilder logLine = LogLine.builder();

		logLine.date(printJob.getLogInfo().getDate());
		logLine.fileName(printJob.getDocument().getName());
		logLine.printer(printJob.getPrintDevice().getName());
		logLine.location(printJob.getPrintDevice().getLocation());
		logLine.numberOfCopy(printJob.getNumberOfCopies());
		logLine.pageType(printJob.getPaperSize().name());
		logLine.layout(printJob.isLandscape()? "landscape" : "portrait");
		logLine.cost(printJob.getBalanceConsumed());
		logLine.status(printJob.getState().name());

		return logLine.build();
	}
	@Override
	public Page<LogLine> toLogLinePage(Page<PrintJob> printJobs) {
		return printJobs.map(this::toLogLine);
	}
}
