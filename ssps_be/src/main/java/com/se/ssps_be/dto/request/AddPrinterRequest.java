package com.se.ssps_be.dto.request;

import com.se.ssps_be.entity.PaperSize;
import com.se.ssps_be.entity.PaperSizeConverter;
import jakarta.persistence.Convert;
import lombok.Data;

import java.util.List;

@Data
public class AddPrinterRequest {
    private String brand;
    private String name;
    private String description;
    private String campus; // Tên khuôn viên
    private String building; // Tên tòa nhà
    private String room; // Số phòng
    private Long pageCapacity;
    private Long remainingPage;
    private boolean remainingBlackInk;
    @Convert(converter = PaperSizeConverter.class)
    private List<PaperSize> supportedPaperSize;
}
