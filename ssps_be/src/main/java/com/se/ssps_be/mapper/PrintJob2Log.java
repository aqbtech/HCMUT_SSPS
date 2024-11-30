package com.se.ssps_be.mapper;

import com.se.ssps_be.dto.LogLine;
import com.se.ssps_be.entity.PrintJob;
import org.springframework.data.domain.Page;

public interface PrintJob2Log {
	LogLine toLogLine(PrintJob printJob);
	Page<LogLine> toLogLinePage(Page<PrintJob> printJobs);
}
