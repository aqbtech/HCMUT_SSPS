package com.se.ssps_be.repo;

import com.se.ssps_be.entity.PrintDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrintDeviceRepo extends JpaRepository<PrintDevice, Long> {
}
