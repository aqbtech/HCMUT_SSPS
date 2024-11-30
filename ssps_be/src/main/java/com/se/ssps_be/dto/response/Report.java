package com.se.ssps_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {
    private String month;          // Tháng, ví dụ: "2024-11"
    private int totalJobs;        // Tổng số công việc in ấn
    private int totalPages;
}
