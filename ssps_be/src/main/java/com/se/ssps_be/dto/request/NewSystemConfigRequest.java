package com.se.ssps_be.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class NewSystemConfigRequest {
    private Integer defaultPagesPerSemester;
    private List<String> allowedFileTypes;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate defaultStartDateForPages;
}
