package edu.usf.gohealthyapi.repository;

import edu.usf.gohealthyapi.entity.MedicalSpeciality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MedicalSpecialityRepository extends JpaRepository<MedicalSpeciality, UUID> {
}
