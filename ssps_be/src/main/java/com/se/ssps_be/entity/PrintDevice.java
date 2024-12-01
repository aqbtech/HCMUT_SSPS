package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PrintDevice {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;
	private String name;
	@Embedded
	private Location location;
	private String status;
	private Long pageCapacity;
	private Long remainingPage;
	private boolean remainingBlackInk;
	private String brand;

	@OneToMany(mappedBy = "printDevice", fetch = FetchType.LAZY)
	private List<PrintJob> printJob;
	@Convert(converter = PaperSizeConverter.class)
	private List<PaperSize> supportedPaperSize;

	public void addPrintJob(PrintJob printJob) {
		this.printJob.add(printJob);
		printJob.setPrintDevice(this);
	}
}
