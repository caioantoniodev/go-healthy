package edu.usf.gohealthyapi.service;

import edu.usf.gohealthyapi.entity.Patient;
import edu.usf.gohealthyapi.repository.PatientRepository;
import edu.usf.gohealthyapi.rest.model.PatientModel;
import edu.usf.gohealthyapi.service.mapper.PatientMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final AddressService addressService;
    private final PatientRepository patientRepository;

    public PatientModel createPatient(PatientModel patientModel) {
        var patient = PatientMapper.INSTANCE.toEntity(patientModel);
        var patientPersisted = patientRepository.save(patient);
        return PatientMapper.INSTANCE.toModel(patientPersisted);
    }

    public List<PatientModel> getPatient() {
        return patientRepository.findAll()
                .stream()
                .map(PatientMapper.INSTANCE::toModel)
                .toList();
    }

    public Patient findPatientById(String patientId) {
        return patientRepository.findById(UUID.fromString(patientId)).orElseThrow();
    }

    public PatientModel updatePatient(String patientId, PatientModel patientModel) {
        this.findPatientById(patientId);

        patientModel.setId(patientId);
        patientModel.getAddressModel().setId(patientModel.getAddressModel().getId());

        var patient = PatientMapper.INSTANCE.toEntity(patientModel);
        var patientPersisted = patientRepository.save(patient);

        return PatientMapper.INSTANCE.toModel(patientPersisted);
    }

    public void deletePatient(String patientId) {
        patientRepository.deleteById(UUID.fromString(patientId));
    }
}
