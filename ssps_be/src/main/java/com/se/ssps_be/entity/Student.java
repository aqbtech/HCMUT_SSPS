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
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    private List<PrintJob> printJobs;

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    private List<Transaction> transactions;

}
