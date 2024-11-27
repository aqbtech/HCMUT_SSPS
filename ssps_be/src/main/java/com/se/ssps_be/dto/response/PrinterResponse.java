package com.se.ssps_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrinterResponse {
    private String printerId;
    private String brand;
    private String model;
    private String description;
    private String location; // Ví dụ: "Building A - Room 101"
}
