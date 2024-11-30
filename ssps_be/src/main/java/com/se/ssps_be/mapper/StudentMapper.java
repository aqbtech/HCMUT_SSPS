package com.se.ssps_be.mapper;

import com.se.ssps_be.entity.Document;
import com.se.ssps_be.entity.LogInfo;
import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.entity.Student;

public interface StudentMapper {
	Student toDTO(Student student);
	Student toDTO(Student student, Document document);
	Student toDTO(Student student, Document document, PrintJob printJob);
	Student toDTO(Student student, Document document, PrintJob printJob, LogInfo logInfo);
}
