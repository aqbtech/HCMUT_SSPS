package com.se.ssps_be.mapper.impl;

import com.se.ssps_be.dto.PrintRequest;
import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.mapper.PrintJobMapper;
import org.springframework.stereotype.Component;

@Component
public class PrintJobMapperImpl implements PrintJobMapper {
	@Override
	public PrintJob toPrintJob(PrintRequest printRequest) {
		var var1 = new PrintJob();
		var1.setPaperSize(printRequest.getPaperSize());
		var1.setNumberOfCopies(printRequest.getNumberOfCopies());
		var1.setLandscape(printRequest.getLayout().equals("landscape"));
		return var1;
	}
}
