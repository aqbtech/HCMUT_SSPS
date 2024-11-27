package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "student")
public class Student {
	// it is mssv and have 7 digits
	@Id
	@Column(name = "id")
	private Long id;
	private String username;
	private Long remainingBalance;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "student")
	private List<PrintJob> printJob;
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "student")
	private List<Document> document;
}
