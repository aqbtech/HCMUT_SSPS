package com.se.ssps_be.dto.request;

import lombok.Data;

@Data
public class AddPrinterRequest {
    private String brand;
    private String model;
    private String description;
    private String campus; // Tên khuôn viên
    private String building; // Tên tòa nhà
    private String room; // Số phòng
}
