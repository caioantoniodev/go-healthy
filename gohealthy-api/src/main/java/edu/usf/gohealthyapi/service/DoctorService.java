package edu.usf.gohealthyapi.service;

import edu.usf.gohealthyapi.entity.Doctor;
import edu.usf.gohealthyapi.repository.DoctorRepository;
import edu.usf.gohealthyapi.rest.model.DoctorModel;
import edu.usf.gohealthyapi.service.mapper.DoctorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final MedicalSpecialityService medicalSpecialityService;
    private final DoctorRepository doctorRepository;

    public List<DoctorModel> getDoctors() {
        var doctors = doctorRepository.findAll();

        return doctors.stream()
                .map(DoctorMapper.INSTANCE::toModel)
                .toList();
    }

    public DoctorModel createDoctor(DoctorModel doctorModel) {
        var speciality = medicalSpecialityService.findMedicalSpecialityById(doctorModel.getMedicalSpecialityModel().getId());

        var doctor = DoctorMapper.INSTANCE.toEntity(doctorModel);
        doctor.setMedicalSpeciality(speciality);

        var doctorPersisted = doctorRepository.save(doctor);

        return DoctorMapper.INSTANCE.toModel(doctorPersisted);
    }

    public Doctor findDoctorById(String doctorId) {
        return doctorRepository.findById(UUID.fromString(doctorId)).orElseThrow();
    }

    public void removeDoctor(String doctorId) {
        var doctor = this.findDoctorById(doctorId);
        doctorRepository.deleteById(UUID.fromString(String.valueOf(doctor.getId())));
    }
}
