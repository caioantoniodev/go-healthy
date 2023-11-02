package edu.usf.gohealthyapi.service;

import edu.usf.gohealthyapi.entity.Schedule;
import edu.usf.gohealthyapi.repository.ScheduleRepository;
import edu.usf.gohealthyapi.rest.model.ScheduleModel;
import edu.usf.gohealthyapi.service.mapper.DoctorMapper;
import edu.usf.gohealthyapi.service.mapper.PatientMapper;
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

    public ScheduleModel createSchedule(ScheduleModel scheduleModel) {
        var patient = patientService.findPatientById(scheduleModel.getPatientModel().getId());
        var doctor = doctorService.findDoctorById(scheduleModel.getDoctorModel().getId());

        var schedule = scheduleMapper.toEntity(scheduleModel);

        schedule.setDoctor(doctor);
        schedule.setPatient(patient);

        var schedulePersisted = scheduleRepository.save(schedule);

        return scheduleMapper.toModel(schedulePersisted);
    }

    public List<ScheduleModel> findScheduleByPatientId(String patientId) {
        var schedules = scheduleRepository.findAllByPatientId(UUID.fromString(patientId));
        return schedules.stream()
                .map(scheduleMapper::toModel)
                .toList();
    }

    public List<ScheduleModel> findAllSchedules() {
        var schedules = scheduleRepository.findAll();
        return schedules.stream()
                .map(scheduleMapper::toModel)
                .toList();
    }

    public void unschedule(String scheduleId) {
        scheduleRepository.deleteById(UUID.fromString(scheduleId));
    }
}
