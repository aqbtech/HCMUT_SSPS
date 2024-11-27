package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@NamedEntityGraph(name = "PrintJob.detail",
	attributeNodes = {
		@NamedAttributeNode("student"),
		@NamedAttributeNode("printDevice"),
		@NamedAttributeNode("document")
	}
)
public class PrintJob {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private int numberOfCopies;
	private boolean landscape;
	private PrintState state;
	private int balanceConsumed;

	@Enumerated(EnumType.STRING)
	private PaperSize paperSize;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "student_id", referencedColumnName = "id")
	private Student student;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "print_device_id", referencedColumnName = "id")
	private PrintDevice printDevice;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "docs_id", referencedColumnName = "id")
	private Document document;
}
