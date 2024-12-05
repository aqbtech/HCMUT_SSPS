package com.se.ssps_be.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentInformationResponse {
    private String mssv;
    private String firstname;
    private String lastname;
    private String dob;
    private Long remainingBalance;
}
