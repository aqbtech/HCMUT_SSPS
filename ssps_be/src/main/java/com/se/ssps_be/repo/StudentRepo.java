package com.se.ssps_be.repo;

import com.se.ssps_be.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {
	Optional<Student> findByUsername(String username);
	@EntityGraph(value = "student-log", type = EntityGraph.EntityGraphType.LOAD)
	Optional<Student> findStudentByUsername(String username);
}
