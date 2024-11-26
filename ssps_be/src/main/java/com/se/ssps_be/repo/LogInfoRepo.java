package com.se.ssps_be.repo;

import com.se.ssps_be.entity.LogInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogInfoRepo extends CrudRepository<LogInfo, Long> {
}
