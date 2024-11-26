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
	private Long id;
	private String username;
	private Long remainingBalance;

	@OneToMany(mappedBy = "student")
	private List<LogInfo> logInfo;
	@OneToMany(mappedBy = "student")
	private List<PrintJob> printJob;
	@OneToMany
	private List<Document> document;
}
