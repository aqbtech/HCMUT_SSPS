package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class PrintDevice {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String location;
	private String status;
	private Long pageCapacity;
	private Long remainingPage;
	private boolean remainingBlackInk;

	@OneToMany(mappedBy = "printDevice", fetch = FetchType.LAZY)
	private List<PrintJob> printJob;
	@Convert(converter = PaperSizeConverter.class)
	private List<PaperSize> supportedPaperSize;

	public void addPrintJob(PrintJob printJob) {
		this.printJob.add(printJob);
		printJob.setPrintDevice(this);
	}
}
