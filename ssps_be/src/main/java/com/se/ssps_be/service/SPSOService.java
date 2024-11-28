package com.se.ssps_be.service;

import com.se.ssps_be.dto.request.AddPrinterRequest;
import com.se.ssps_be.dto.request.NewSystemConfigRequest;
import com.se.ssps_be.dto.response.PrintJobResponse;
import com.se.ssps_be.dto.response.PrinterResponse;
import com.se.ssps_be.dto.response.Report;
import com.se.ssps_be.dto.response.SystemConfigResponse;

import java.time.LocalDate;
import java.util.List;

public interface SPSOService {
    String updatePrinterStatus(Long printerId, boolean status);
    String addPrinter(AddPrinterRequest request);
    SystemConfigResponse getCurrentConfig();
    SystemConfigResponse addNewConfig(NewSystemConfigRequest request);
    List<PrintJobResponse> getAllPrintJobs();
    List<PrintJobResponse> getPrintJobsByDate(LocalDate date);
    List<PrintJobResponse> getPrintJobsByStudent(String studentId);
    List<PrintJobResponse> getPrintJobsByStudentByDate(String studentId,LocalDate date);
    List<PrintJobResponse> getPrintJobsByPrinter(Long printerId);
    public List<PrinterResponse> getAllPrinter();
    List<PrinterResponse> getEnablePrinter();
    List<PrinterResponse> getDisablePrinter();
    void generateMonthlyReportAutomatically();
    Report getreport(LocalDate month);

}
