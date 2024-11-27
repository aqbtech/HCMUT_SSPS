package com.se.ssps_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrintJobResponse {
    private StudentResponse studentResponse;
    private PrinterResponse printerResponse;
    private String fileName;
    private Integer totalPages;
    private String paperSize;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
