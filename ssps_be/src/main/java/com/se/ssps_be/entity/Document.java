package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

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
	@Column(nullable = false)
	private Integer totalPages;
	@Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
	private Boolean deleted = Boolean.FALSE;
	@Lob
	@Column(name = "data", nullable = false, columnDefinition = "MEDIUMBLOB")
	@Basic(fetch = FetchType.LAZY)
	private byte[] content;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "student_id", referencedColumnName = "id")
	private Student student;
	@OneToMany(fetch = FetchType.LAZY)
	private List<PrintJob> printJob;
}
