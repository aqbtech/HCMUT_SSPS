package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NamedEntityGraph(name = "config",
        attributeNodes = {
                @NamedAttributeNode("allowedFileTypes"),
        }
)
public class SystemConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer defaultPagesPerSemester; // Số trang in mặc định cấp cho sinh viên mỗi học kỳ
    @ElementCollection
    @CollectionTable(name = "allowed_file_types", joinColumns = @JoinColumn(name = "config_id"))
    @Column(name = "file_type")
    private List<String> allowedFileTypes; // Các loại tệp tin cho phép tải lên

    private LocalDate defaultStartDateForPages; // Ngày bắt đầu cấp số trang cho sinh viên
    private boolean active;
}