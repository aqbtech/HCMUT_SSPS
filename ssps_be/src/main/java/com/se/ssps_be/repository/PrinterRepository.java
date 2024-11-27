package com.se.ssps_be.repository;

import com.se.ssps_be.entity.Printer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PrinterRepository extends JpaRepository<Printer, String> {

    @Query("select p from Printer p " +
            "where p.description = :status")
    List<Printer> findByDescription(@Param("status") String status);

}
