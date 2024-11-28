package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Printer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String printerId;

    private String brand;
    private String model;
    private String description;

    @Embedded
    private Location location; // Tòa nhà và phòng máy in

    @OneToMany(mappedBy = "printer", fetch = FetchType.LAZY)
    private List<PrintJob> printJobs;
}
