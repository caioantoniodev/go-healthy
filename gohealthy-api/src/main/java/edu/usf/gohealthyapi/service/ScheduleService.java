package edu.usf.gohealthyapi.service;

import edu.usf.gohealthyapi.repository.ScheduleRepository;
import edu.usf.gohealthyapi.rest.model.ScheduleRequestModel;
import edu.usf.gohealthyapi.rest.model.ScheduleResponseModel;
import edu.usf.gohealthyapi.service.mapper.ScheduleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final PatientService patientService;
    private final DoctorService doctorService;
    private final ScheduleMapper scheduleMapper;

    private final ScheduleRepository scheduleRepository;

    public ScheduleResponseModel createSchedule(ScheduleRequestModel scheduleRequestModel) {
        var patient = patientService.findPatientById(scheduleRequestModel.getPatientModel().getId());
        var doctor = doctorService.findDoctorById(scheduleRequestModel.getDoctorModel().getId());

        var schedule = scheduleMapper.toEntity(scheduleRequestModel);

        schedule.setDoctor(doctor);
        schedule.setPatient(patient);

        var schedulePersisted = scheduleRepository.save(schedule);

        return scheduleMapper.toModel(schedulePersisted);
    }

    public List<ScheduleResponseModel> findScheduleByPatientId(String patientId) {
        var schedules = scheduleRepository.findAllByPatientId(UUID.fromString(patientId));
        return schedules.stream()
                .map(scheduleMapper::toModel)
                .toList();
    }

    public List<ScheduleResponseModel> findAllSchedules() {
        var schedules = scheduleRepository.findAll();
        return schedules.stream()
                .map(scheduleMapper::toModel)
                .toList();
    }

    public void unschedule(String scheduleId) {
        scheduleRepository.deleteById(UUID.fromString(scheduleId));
    }
}
