package com.se.ssps_be.service.impl;

import com.se.ssps_be.dto.request.AddPrinterRequest;
import com.se.ssps_be.dto.request.NewSystemConfigRequest;
import com.se.ssps_be.dto.response.*;
import com.se.ssps_be.entity.*;
import com.se.ssps_be.exception.ErrorCode;
import com.se.ssps_be.exception.WebServerException;
import com.se.ssps_be.repo.PrintDeviceRepo;
import com.se.ssps_be.repo.PrintJobRepo;
import com.se.ssps_be.repository.*;
import com.se.ssps_be.service.SPSOService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SPSOServiceImpl implements SPSOService {
    @Autowired
    private final SPSORepository spsoRepository;
    @Autowired
    private final PrintDeviceRepo printerRepository;
    @Autowired
    private final SystemConfigRepository systemConfigRepository;
    @Autowired
    private final StudentRepository studentRepository;
    @Autowired
    private final PrintJobRepo printJobRepository;
    @Autowired
    private final PrintJobReportRepository printJobReportRepository;

    @Override
    public String updatePrinterStatus(String printerId, boolean status) {// Cập nhật trạng thái máy in (bật/tắt)
        try {
            Optional<PrintDevice> printerOpt = printerRepository.findById(printerId);
            if (printerOpt.isPresent()) {
                PrintDevice printer = printerOpt.get();
                printer.setStatus(status ? "enabled" : "disabled");
                printerRepository.save(printer);
                return status ?  "Máy in đã khả dụng" : "Xóa máy in thành công";
            } else {
                throw new IllegalArgumentException("Printer not found with id: " + printerId);
            }
        } catch (WebServerException e) {
            // Log lỗi
            throw new WebServerException(ErrorCode.PRINT_NOT_FOUND);
        }
    }

    @Override
    public String addPrinter(AddPrinterRequest request){
        try{
            Location location = Location.builder()
                    .campus(request.getCampus())
                    .building(request.getBuilding())
                    .room(request.getRoom())
                    .build();
            PrintDevice printDevice = PrintDevice.builder()
                    .brand(request.getBrand())
                    .name(request.getName())
                    .status("enabled")
                    .pageCapacity(request.getPageCapacity())
                    .remainingPage(request.getRemainingPage())
                    .remainingBlackInk(request.isRemainingBlackInk())
                    .supportedPaperSize(request.getSupportedPaperSize())
                    .location(location)
                    .build();
            printerRepository.save(printDevice);

            return "Thêm máy in thành công";
        }
        catch(WebServerException e){
            throw new WebServerException(ErrorCode.UNKNOWN_ERROR);
        }
    }

    @Override
    public List<PrinterResponse> getAllPrinter(){
        List<PrintDevice> printers = printerRepository.findAll();
        List<PrinterResponse> responses = new ArrayList<>();
        for (PrintDevice printer: printers){
            responses.add(this.mapToPrinterResponse(printer));
        }
        return responses;
    }

    @Override
    public List<PrinterResponse> getEnablePrinter(){
        List<PrintDevice> printers = printerRepository.findByStatus("enabled");
        List<PrinterResponse> responses = new ArrayList<>();
        for (PrintDevice printer: printers){
            responses.add(this.mapToPrinterResponse(printer));
        }
        return responses;
    }

    @Override
    public List<PrinterResponse> getDisablePrinter(){
        List<PrintDevice> printers = printerRepository.findByStatus("disabled");
        List<PrinterResponse> responses = new ArrayList<>();
        for (PrintDevice printer: printers){
            responses.add(this.mapToPrinterResponse(printer));
        }
        return responses;
    }

    @Override
    public SystemConfigResponse getCurrentConfig() {
        SystemConfig systemConfig = systemConfigRepository.findByActiveIsTrue()
                .orElseThrow(() -> new RuntimeException("No active system configuration found!"));
        return SystemConfigResponse.builder()
                .allowedFileTypes(systemConfig.getAllowedFileTypes())
                .defaultPagesPerSemester(systemConfig.getDefaultPagesPerSemester())
                .defaultStartDateForPages(systemConfig.getDefaultStartDateForPages())
                .build();

    }

    @Override
    public SystemConfigResponse addNewConfig(NewSystemConfigRequest request) {
        // Vô hiệu hóa tất cả cấu hình hiện tại

        systemConfigRepository.findAll().forEach(config -> {
            config.setActive(false);
            systemConfigRepository.save(config);
        });
        SystemConfig newConfig = SystemConfig.builder()
                .active(true)
                .defaultPagesPerSemester(request.getDefaultPagesPerSemester())
                .allowedFileTypes(request.getAllowedFileTypes())
                .defaultStartDateForPages(request.getDefaultStartDateForPages())
                .build();
        try {
            systemConfigRepository.save(newConfig);
        } catch (WebServerException e) {
            throw new WebServerException(ErrorCode.UNKNOWN_ERROR);
        }
        return SystemConfigResponse.builder()
                .allowedFileTypes(newConfig.getAllowedFileTypes())
                .defaultPagesPerSemester(newConfig.getDefaultPagesPerSemester())
                .defaultStartDateForPages(newConfig.getDefaultStartDateForPages())
                .build();
    }

    private PrinterResponse mapToPrinterResponse(PrintDevice printer) {
        String building = printer.getLocation().getBuilding();
        String room = printer.getLocation().getRoom();
        String campus = printer.getLocation().getCampus();
        String location = String.join(",",building,room,campus);
        return PrinterResponse.builder()
                .printerId(printer.getId())
                .brand(printer.getBrand())
                .model(printer.getName())
                .description(printer.getStatus())
                .pageCapacity(printer.getPageCapacity())
                .supportedPaperSize(printer.getSupportedPaperSize())
                .remainingPage(printer.getRemainingPage())
                .remainingBlackInk(printer.isRemainingBlackInk())
                .location(location) // Tùy chỉnh hàm toString() trong `Location`
                .build();
    }

    private StudentResponse mapToStudentResponse(Student student){
        return StudentResponse.builder()
                .id(student.getId())
                .username(student.getUsername())
                .build();
    }

    private PrintJobResponse mapToPrintJobResponse(PrintJob printJob){
        PrintJobResponse response;
        StudentResponse studentResponse = this.mapToStudentResponse(printJob.getStudent());
        PrinterResponse printerResponse = this.mapToPrinterResponse(printJob.getPrintDevice());
        response = PrintJobResponse.builder()
                .studentResponse(studentResponse)
                .totalPages(printJob.getTotalPages())
                .endTime(printJob.getEndTime())
                .fileName(printJob.getDocument().getName())
                .paperSize(String.valueOf(printJob.getPaperSize()))
                .printerResponse(printerResponse)
                .startTime(printJob.getStartTime())
                .build();
        return response;
    }
    @Override
    public List<PrintJobResponse> getAllPrintJobs() {
        List<PrintJob> printJobs = printJobRepository.findAll();
        List<PrintJobResponse> responses = new ArrayList<>();
        for(PrintJob printJob : printJobs){
            responses.add(this.mapToPrintJobResponse(printJob));
        }
        return responses;
    }

    @Override
    public List<PrintJobResponse> getPrintJobsByDate(LocalDate date){
        List<PrintJob> printJobs = printJobRepository.findPrintersByDate(date);
        List<PrintJobResponse> responses = new ArrayList<>();
        for(PrintJob printJob : printJobs){
            responses.add(this.mapToPrintJobResponse(printJob));
        }
        return responses;
    }
    @Override
    public List<PrintJobResponse> getPrintJobsByStudent(String studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(()->new WebServerException(ErrorCode.USER_NOT_FOUND));
        List<PrintJob> printJobs = printJobRepository.findByStudent(student);
        List<PrintJobResponse> responses = new ArrayList<>();
        for(PrintJob printJob : printJobs){
            responses.add(this.mapToPrintJobResponse(printJob));
        }
        return responses;
    }

    @Override
    public List<PrintJobResponse> getPrintJobsByStudentByDate(String studentId,LocalDate date){
        List<PrintJobResponse> responses = this.getPrintJobsByDate(date);
        responses.stream().filter(printJobResponse
                -> printJobResponse.getStudentResponse().getId().equals(studentId))
                .collect(Collectors.toList());
        return responses;
    }

    @Override
    public List<PrintJobResponse> getPrintJobsByPrinter(String printerId) {
        PrintDevice printer = printerRepository.findById(printerId)
                .orElseThrow(()->new WebServerException(ErrorCode.PRINT_NOT_FOUND));
        List<PrintJob> printJobs = printJobRepository.findByPrintDevice(printer);
        List<PrintJobResponse> responses = new ArrayList<>();
        for(PrintJob printJob : printJobs){
            responses.add(this.mapToPrintJobResponse(printJob));
        }
        return responses;
    }

    @Override
    public List<Report> getYearReport(String year){
        List<PrintJobReport> reports = printJobReportRepository.findPrintJobReportByYear(year);
        List<Report> response = new ArrayList<>();
        for(PrintJobReport report: reports){
            response.add(Report.builder()
                            .month(report.getMonth())
                            .totalJobs(report.getTotalJobs())
                            .totalPages(report.getTotalPages())
                            .totalJobs(report.getTotalJobs())
                    .build());
        }
        return response;
    }

    public Report getreport(LocalDate month) {
        int year = month.getYear();
        int monthValue = month.getMonthValue();
        // Lấy thống kê từ repository
        List<PrintJob> results = printJobRepository.findPrintersByMonth(year, monthValue);
        int totalJobs = results.size();
        int totalPages = 0;
        for(PrintJob printJob : results){
            totalPages += printJob.getTotalPages();
        }

        // Map kết quả truy vấn thành DTO
        Report report = Report.builder()
                .totalJobs(totalJobs)
                .month(month.format(DateTimeFormatter.ofPattern("yyyy-MM")))
                .totalPages(totalPages)
                .build();
        return report;
    }
    @Override
    @Scheduled(cron = "0 0 0 1 * *") // Chạy vào 0h00 ngày đầu tiên mỗi tháng
//    @Scheduled(fixedRate = 60000)
    public void generateMonthlyReportAutomatically() {
        // Xác định tháng cần báo cáo (tháng trước)
        LocalDate now = LocalDate.now();
        LocalDate lastMonth = now.minusMonths(1);
        int year = now.getYear();
        int monthValue = now.getMonthValue() - 1;
        // Lấy thống kê từ repository
        List<PrintJob> results = printJobRepository.findPrintersByMonth(year, monthValue);

        String month = lastMonth.format(DateTimeFormatter.ofPattern("yyyy-MM"));
        int totalJobs = results.size();
        int totalPages = 0;
        for(PrintJob printJob : results){
            totalPages += printJob.getTotalPages();
        }

        // Lưu vào database
        PrintJobReport report = PrintJobReport.builder()
                .totalJobs(totalJobs)
                .month(month)
                .totalPages(totalPages)
                .build();
        try{
            printJobReportRepository.save(report);
        }catch (WebServerException e){
            throw new WebServerException(ErrorCode.UNKNOWN_ERROR);
        }
    }
}
