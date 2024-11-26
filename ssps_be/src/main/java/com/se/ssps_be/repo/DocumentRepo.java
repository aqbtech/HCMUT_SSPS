package com.se.ssps_be.repo;

import com.se.ssps_be.entity.Document;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepo extends CrudRepository<Document, Long> {
}
