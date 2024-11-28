package com.se.ssps_be.dto.request;

import lombok.Data;

@Data
public class ToggleePrinterStatusRequest {
    public Long printerId;
    public boolean status;
}
