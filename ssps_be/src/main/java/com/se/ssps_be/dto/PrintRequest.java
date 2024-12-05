package com.se.ssps_be.dto;

import com.se.ssps_be.entity.PaperSize;
import lombok.Data;

@Data
public class PrintRequest {
	private Long docsId;
	private String printDeviceId;
	private PaperSize paperSize;
	private int numberOfCopies;
	private String pageRange; // accepted format: all, even, odd, custom(min-max: 1-3,5,7-9)
	private int min;
	private int max;
	private String pageType; // accepted format: single, double
	private String layout; // accepted format: portrait, landscape
}
