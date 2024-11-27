package com.se.ssps_be.repo;

import com.se.ssps_be.entity.PrintJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrintJobRepo extends JpaRepository<PrintJob, Long> {
}
