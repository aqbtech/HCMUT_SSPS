package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class PrintJob {
	@Id
	private Long id;
	private PageSize paperSize;
	private int numberOfCopies;
	private boolean landscape;
	private PageSize pageSize;

	@OneToMany
	@JoinColumn(name = "document_id", referencedColumnName = "id")
	private List<Document> document;
	@ManyToOne
	@JoinColumn(name = "student_id", referencedColumnName = "id")
	private Student student;
	@ManyToOne
	@JoinColumn(name = "print_device_id", referencedColumnName = "id")
	private PrintDevice printDevice;
}
