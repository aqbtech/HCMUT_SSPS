package com.se.ssps_be.mapper.impl;

import com.se.ssps_be.entity.Document;
import com.se.ssps_be.entity.LogInfo;
import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.entity.Student;
import com.se.ssps_be.mapper.StudentMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class StudentMapperImpl implements StudentMapper {
	@Override
	public Student toDTO(Student student) {
		Student studentDTO = new Student();
		studentDTO.setId(student.getId());
		studentDTO.setUsername(student.getUsername());
		studentDTO.setRemainingBalance(student.getRemainingBalance());
		studentDTO.setDocument(new ArrayList<>());
		studentDTO.setPrintJob(new ArrayList<>());
		// TODO: get real data from database
		return studentDTO;
	}

	@Override
	public Student toDTO(Student student, Document document) {
		return null;
	}

	@Override
	public Student toDTO(Student student, Document document, PrintJob printJob) {
		return null;
	}

	@Override
	public Student toDTO(Student student, Document document, PrintJob printJob, LogInfo logInfo) {
		return null;
	}
}
