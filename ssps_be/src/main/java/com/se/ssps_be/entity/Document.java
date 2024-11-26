package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public abstract class Document {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private DocsType type;
	@Lob
	@Column(name = "data", nullable = false, columnDefinition = "MEDIUMBLOB")
	private byte[] content;

	@ManyToOne
	@JoinColumn(name = "student_id", referencedColumnName = "id")
	private Student student;
	@ManyToOne
	@JoinColumn(name = "print_job_id", referencedColumnName = "id")
	private PrintJob printJob;
}
