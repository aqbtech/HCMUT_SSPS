package com.se.ssps_be.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class PrintDevice {
	@Id
	private Long id;
	private String name;
	private String location;
	private String status;
	private Long pageCapacity;
	private Long remainingPage;

	@OneToMany(mappedBy = "printDevice", fetch = FetchType.LAZY)
	private List<PrintJob> printJob;
}
