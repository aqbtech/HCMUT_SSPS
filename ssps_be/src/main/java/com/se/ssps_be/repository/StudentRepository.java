package com.se.ssps_be.repository;

import com.se.ssps_be.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {
}
