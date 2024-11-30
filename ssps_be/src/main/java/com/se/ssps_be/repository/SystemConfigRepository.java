package com.se.ssps_be.repository;

import com.se.ssps_be.entity.SystemConfig;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SystemConfigRepository extends JpaRepository<SystemConfig, Long> {
    @EntityGraph(value = "config", type = EntityGraph.EntityGraphType.FETCH)
    Optional<SystemConfig> findByActiveIsTrue();
}
