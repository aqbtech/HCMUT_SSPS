package com.se.ssps_be.service;

import com.se.ssps_be.entity.Document;
import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.entity.Student;

public interface PrintService {
	void printDocument(Student student, Document document, PrintJob printJob);
}
