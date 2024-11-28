package com.se.ssps_be.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class SystemConfigResponse {
    private Integer defaultPagesPerSemester;
    private List<String> allowedFileTypes;
    private LocalDate defaultStartDateForPages;
}
