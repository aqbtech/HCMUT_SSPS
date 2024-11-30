package com.se.ssps_be.repository;

import com.se.ssps_be.entity.PrintJobReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrintJobReportRepository extends JpaRepository<PrintJobReport, Long> {
}
