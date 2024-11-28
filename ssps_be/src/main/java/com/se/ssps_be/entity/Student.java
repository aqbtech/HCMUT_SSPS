package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // it is mssv and have 7 digits
    private Long id;

    private String username;

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    private List<Transaction> transactions;

	private Long remainingBalance;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "student")
	private List<PrintJob> printJob;
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "student")
	private List<Document> document;
}