package com.se.ssps_be.repo;

import com.se.ssps_be.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {
	Optional<Student> findByUsername(String username);
}
