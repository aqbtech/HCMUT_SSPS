package com.se.ssps_be.dto.response;

import com.se.ssps_be.entity.PaperSize;
import com.se.ssps_be.entity.PaperSizeConverter;
import jakarta.persistence.Convert;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrinterResponse {
    private String printerId;
    private String brand;
    private String model;
    private String description;
    private Long pageCapacity;
    private Long remainingPage;
    private boolean remainingBlackInk;
    private String location; // Ví dụ: "Building A - Room 101"
    @Convert(converter = PaperSizeConverter.class)
    private List<PaperSize> supportedPaperSize;
}
