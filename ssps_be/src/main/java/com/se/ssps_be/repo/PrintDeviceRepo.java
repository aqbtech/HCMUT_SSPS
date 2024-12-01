package com.se.ssps_be.repo;

import com.se.ssps_be.entity.PrintDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrintDeviceRepo extends JpaRepository<PrintDevice, String> {
    @Query("select p from PrintDevice p " +
            "where p.status = :status")
    List<PrintDevice> findByStatus(@Param("status") String status);
}
