package edu.usf.gohealthyapi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String crm;

    @ManyToOne(targetEntity = MedicalSpeciality.class)
    @JoinColumn(name = "medical_speciality_id", foreignKey = @ForeignKey(name = "fk_doctor_medical_speciality_id"))
    private MedicalSpeciality medicalSpeciality;
}
