package com.se.ssps_be.repo;

import com.se.ssps_be.entity.PrintJob;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrintJobRepo extends CrudRepository<PrintJob, Long> {
}
