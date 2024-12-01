package com.se.ssps_be.repository;

import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.entity.PrintJobReport;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrintJobReportRepository extends JpaRepository<PrintJobReport, Long> {
    @Query("SELECT DISTINCT p FROM PrintJobReport p WHERE SUBSTRING(p.month, 1, 4) = :yearStr")
    List<PrintJobReport> findPrintJobReportByYear(@Param("yearStr") String yearStr);
}
