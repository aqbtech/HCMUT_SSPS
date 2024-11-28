package com.se.ssps_be.dto;

import com.se.ssps_be.entity.Location;
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
	private Location location;
	private int numberOfCopy;
	private String pageType;
	private String layout;
	private int cost; // in page
	private String status; // may be had enum instead String
}
