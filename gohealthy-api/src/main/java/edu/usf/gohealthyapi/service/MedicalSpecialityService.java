package edu.usf.gohealthyapi.service;

import edu.usf.gohealthyapi.entity.MedicalSpeciality;
import edu.usf.gohealthyapi.repository.MedicalSpecialityRepository;
import edu.usf.gohealthyapi.rest.model.MedicalSpecialityModel;
import edu.usf.gohealthyapi.service.mapper.MedicalSpecialityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MedicalSpecialityService {

    private final MedicalSpecialityRepository medicalSpecialityRepository;

    public MedicalSpeciality findMedicalSpecialityById(String medicalSpecialityId) {
        return medicalSpecialityRepository.findById(UUID.fromString(medicalSpecialityId)).orElseThrow();
    }

    public Boolean existsMedicalSpecialityById(String medicalSpecialityId) {
        return medicalSpecialityRepository.existsById(UUID.fromString(medicalSpecialityId));
    }

    public List<MedicalSpecialityModel> getSpecialists() {
        return medicalSpecialityRepository.findAll().stream()
                .map(MedicalSpecialityMapper.INSTANCE::toModel)
                .toList();
    }

    public MedicalSpecialityModel createSpeciality(MedicalSpecialityModel medicalSpecialityModel) {
        var medicalSpeciality = MedicalSpecialityMapper.INSTANCE.toEntity(medicalSpecialityModel);

        var medicalSpecialityPersisted = medicalSpecialityRepository.save(medicalSpeciality);

        return MedicalSpecialityMapper.INSTANCE.toModel(medicalSpecialityPersisted);
    }

    public void deleteSpeciality(String specialityId) {
        var speciality = this.findMedicalSpecialityById(specialityId);
        medicalSpecialityRepository.deleteById(speciality.getId());
    }

    private MedicalSpecialityModel buildMedicalSpecialityModel(MedicalSpeciality medicalSpeciality) {
        return MedicalSpecialityModel.builder()
                .id(String.valueOf(medicalSpeciality.getId()))
                .name(medicalSpeciality.getName())
                .build();
    }
}
