package com.se.ssps_be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class LogInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Date date;

	@OneToOne(fetch = FetchType.LAZY)
	private PrintJob printJob;
}
