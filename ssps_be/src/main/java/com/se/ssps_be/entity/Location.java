package com.se.ssps_be.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    private String campus; // Tên khuôn viên
    private String building; // Tên tòa nhà
    private String room; // Số phòng
}