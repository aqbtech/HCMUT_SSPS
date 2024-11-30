package com.se.ssps_be.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PrintJobDateRequest {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
}
