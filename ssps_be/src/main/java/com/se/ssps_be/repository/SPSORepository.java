package com.se.ssps_be.repository;

import com.se.ssps_be.entity.SPSO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SPSORepository extends JpaRepository<SPSO, String> {
}
