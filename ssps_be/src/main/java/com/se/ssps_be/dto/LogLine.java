package com.se.ssps_be.dto;

import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class LogLine {
	private Date date;
	private String fileName;
	private String printer;
	private String place;
	private int numberOfCopy;
	private String pageRange;
	private String pageType;
	private String layout;
	private int cost; // in page
	private String status; // may be had enum instead String
}
