package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrintQuota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Student student;

    private Integer pagesAllowedPerSemester; // Số trang được cấp mỗi học kỳ
    private Integer pagesUsed; // Số trang đã sử dụng
    private String semester; // Mỗi học kỳ có một số trang in mặc định khác nhau
}

