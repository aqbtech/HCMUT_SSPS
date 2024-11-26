package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class LogInfo {
	@Id
	private Long id;
	private Date date;

	@ManyToOne
	@JoinColumn(name = "student_id", referencedColumnName = "id")
	private Student student;
	@OneToOne
	private PrintJob printJob;
}
