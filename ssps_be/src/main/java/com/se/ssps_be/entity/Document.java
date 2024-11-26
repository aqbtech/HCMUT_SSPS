package com.se.ssps_be.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Document {
	@Id
	private Long id;
	private String name;
	private byte[] content;
}
