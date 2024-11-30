package com.se.ssps_be.entity;

import lombok.Getter;

/**
 * Enum for print state
 * Group 0-5 is error state from service
 * Group 6-10 is error state from physical printer
 */
@Getter
public enum PrintState {
	PENDING(0, "Pending"),
	PRINTING(1, "Printing"),
	PRINTED(2, "Printed"),
	CANCELLED(3, "Cancelled"),
	NOT_ENOUGH_BALANCE(4, "Not enough balance"),
	PRINT_DEVICE_OFFLINE(5, "Print device offline"),
	PRINT_DEVICE_NOT_FOUND(6, "Print device not found"),
	NOT_ENOUGH_INK(7, "Not enough ink"),
	NOT_SUPPORTED_PAPER_SIZE(8, "Not supported paper size"),
	NOT_ENOUGH_PAPER(9, "Not enough paper");
	;


	private final int code;
	private final String message;
	PrintState(int code, String message) {
		this.code = code;
		this.message = message;
	}
}
