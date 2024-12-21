package com.se.ssps_be.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BuyPagesRequest {
    private int quantity;
}
