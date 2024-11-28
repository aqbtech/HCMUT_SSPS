package com.se.ssps_be.repo;

import com.se.ssps_be.entity.LogInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogInfoRepo extends JpaRepository<LogInfo, Long> {
}
