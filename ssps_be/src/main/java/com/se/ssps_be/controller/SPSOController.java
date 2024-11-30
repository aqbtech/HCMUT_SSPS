package com.se.ssps_be.controller;

import com.se.ssps_be.dto.request.AddPrinterRequest;
import com.se.ssps_be.dto.request.NewSystemConfigRequest;
import com.se.ssps_be.dto.request.ToggleePrinterStatusRequest;
import com.se.ssps_be.dto.response.*;
import com.se.ssps_be.service.SPSOService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/spso")
public class SPSOController {
    @Autowired
    private final SPSOService spsoService;

    @GetMapping("/printer")
    public ResponseAPITemplate<List<PrinterResponse>> getPrinter(){
        List<PrinterResponse> response = spsoService.getAllPrinter();
        return ResponseAPITemplate.<List<PrinterResponse>>builder()
                .result(response)
                .build();
    }

    @GetMapping("/enable_printer")
    public ResponseAPITemplate<List<PrinterResponse>> getEnablePrinter(){
        List<PrinterResponse> response = spsoService.getEnablePrinter();
        return ResponseAPITemplate.<List<PrinterResponse>>builder()
                .result(response)
                .build();
    }

    @GetMapping("/disable_printer")
    public ResponseAPITemplate<List<PrinterResponse>> getDisablePrinter(){
        List<PrinterResponse> response = spsoService.getDisablePrinter();
        return ResponseAPITemplate.<List<PrinterResponse>>builder()
                .result(response)
                .build();
    }

    @PutMapping("/printer/update_status")
    public ResponseAPITemplate<String> togglePrinterStatus(
            @RequestBody ToggleePrinterStatusRequest request
            ){
        String response = spsoService.updatePrinterStatus(
                request.getPrinterId(),
                request.status);
        return ResponseAPITemplate.<String>builder()
                .message("Printer status updated")
                .result(response)
                .build();
    }

    @PostMapping("/printer/add")
    public ResponseAPITemplate<String> addPrinter(
            @RequestBody AddPrinterRequest request
            ) {
        String response = spsoService.addPrinter(request);
        return ResponseAPITemplate.<String>builder()
                .message("Printer status updated")
                .result(response)
                .build();
    }

    @GetMapping("/printer/config")
    public ResponseAPITemplate<SystemConfigResponse> getConfig(){
        return ResponseAPITemplate.<SystemConfigResponse>builder()
                .message("This is current config of system!")
                .result(spsoService.getCurrentConfig())
                .build();
    }
    @PostMapping("/printer/config")
    public ResponseAPITemplate<SystemConfigResponse> createConfig(
            @RequestBody NewSystemConfigRequest request){
        return ResponseAPITemplate.<SystemConfigResponse>builder()
                .message("Config change successfully!")
                .result(spsoService.addNewConfig(request))
                .build();
    }

    @GetMapping("/printerjob")
    public ResponseAPITemplate<List<PrintJobResponse>> getAllPrintJobs() {
        List<PrintJobResponse> jobs = spsoService.getAllPrintJobs();
        return ResponseAPITemplate.<List<PrintJobResponse>>builder()
                .result(jobs)
                .build();
    }

    @GetMapping("/printerjob/date/{date}")
    public ResponseAPITemplate<List<PrintJobResponse>> getAllPrintJobs(@PathVariable LocalDate date) {
        List<PrintJobResponse> jobs = spsoService.getPrintJobsByDate(date);
        return ResponseAPITemplate.<List<PrintJobResponse>>builder()
                .result(jobs)
                .build();
    }

    @GetMapping("/printerjob/student/{studentId}")
    public ResponseAPITemplate<List<PrintJobResponse>> getPrintJobsByStudent(@PathVariable String studentId) {
        List<PrintJobResponse> jobs = spsoService.getPrintJobsByStudent(studentId);
        return ResponseAPITemplate.<List<PrintJobResponse>>builder()
                .result(jobs)
                .build();
    }

    @GetMapping("/printerjob/student/{studentId}/date/{date}")
    public ResponseAPITemplate<List<PrintJobResponse>> getPrintJobsByStudentAndDate(
            @PathVariable String studentId,
            @PathVariable LocalDate date) {
        List<PrintJobResponse> jobs = spsoService.getPrintJobsByStudentByDate(studentId, date);
        return ResponseAPITemplate.<List<PrintJobResponse>>builder()
                .result(jobs)
                .build();
    }

    @GetMapping("/printerjob/printer/{printerId}")
    public ResponseAPITemplate<List<PrintJobResponse>> getPrintJobsByPrinter(@PathVariable Long printerId) {
        List<PrintJobResponse> jobs = spsoService.getPrintJobsByPrinter(printerId);
        return ResponseAPITemplate.<List<PrintJobResponse>>builder()
                .result(jobs)
                .build();
    }

    @GetMapping("/report")
    public ResponseAPITemplate<Report> getReport(@RequestParam("month") @DateTimeFormat(pattern = "yyyy-MM") Optional<YearMonth> month) {
        YearMonth now = YearMonth.now();
        LocalDate date = month.orElse(now).atDay(1);
        Report report = spsoService.getreport(date);
        return ResponseAPITemplate.<Report>builder()
                .result(report)
                .build();
    }
}
