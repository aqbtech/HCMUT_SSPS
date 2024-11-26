package com.se.ssps_be.service.impl;

import com.se.ssps_be.entity.Document;
import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.entity.Student;
import com.se.ssps_be.service.PrintService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PrintImpl implements PrintService {
	@Override
	public void printDocument(Student student, Document document, PrintJob printJob) {
		// TODO Auto-generated method stub
		System.out.println("Print document: " + document.getName() + " for student: " + student.getUsername());
	}

}
