package com.se.ssps_be.repo;

import com.se.ssps_be.entity.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DocumentRepo extends JpaRepository<Document, Long> {
	Page<Document> findByStudent_Username(String studentUsername, Pageable pageable);
	Optional<Document> findByIdAndStudent_Username(Long id, String studentUsername);
	void deleteByIdAndStudent_Username(Long id, String studentUsername);
	Page<Document> findByStudent_UsernameAndDeletedFalse(String username, Pageable pageable);

}
