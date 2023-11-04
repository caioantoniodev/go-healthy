package edu.usf.gohealthyapi.repository;

import edu.usf.gohealthyapi.entity.HealthEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HealthEventRepository extends JpaRepository<HealthEvent, UUID> {
}
