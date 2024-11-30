package com.se.ssps_be.repository;

import com.se.ssps_be.entity.PrintDevice;
import com.se.ssps_be.entity.PrintJob;
import com.se.ssps_be.entity.Student;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface PrintJobRepository extends JpaRepository<PrintJob, Long> {
    @Query("SELECT DISTINCT p FROM PrintJob p WHERE YEAR(p.startTime) = :year AND MONTH(p.startTime) = :month")
    @EntityGraph(value = "printjob", type = EntityGraph.EntityGraphType.FETCH)
    List<PrintJob> findPrintersByMonth(@Param("year") int year, @Param("month") int month);
    @EntityGraph(value = "printjob", type = EntityGraph.EntityGraphType.FETCH)
    @Query("SELECT DISTINCT p FROM PrintJob p WHERE FUNCTION('DATE', p.startTime) = :date")
    List<PrintJob> findPrintersByDate(@Param("date") LocalDate date);
    @EntityGraph(value = "printjob", type = EntityGraph.EntityGraphType.FETCH)
    List<PrintJob> findByStudent(Student student);
    @EntityGraph(value = "printjob", type = EntityGraph.EntityGraphType.FETCH)
    List<PrintJob> findByPrintDevice(PrintDevice printer);
}
