package com.se.ssps_be.mapper;

import com.se.ssps_be.dto.PrintRequest;
import com.se.ssps_be.entity.PrintJob;

public interface PrintJobMapper {
	PrintJob toPrintJob(PrintRequest printRequest);
}
