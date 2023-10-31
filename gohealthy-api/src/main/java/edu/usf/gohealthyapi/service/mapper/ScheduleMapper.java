package edu.usf.gohealthyapi.service.mapper;

import edu.usf.gohealthyapi.entity.Schedule;
import edu.usf.gohealthyapi.rest.model.ScheduleModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {PatientMapper.class, DoctorMapper.class})
public interface ScheduleMapper {

    @Mapping(source = "patientModel", target = "patient")
    @Mapping(source = "doctorModel", target = "doctor")
    Schedule toEntity(ScheduleModel scheduleModel);

    @Mapping(source = "patient", target = "patientModel")
    @Mapping(source = "doctor", target = "doctorModel")
    ScheduleModel toModel(Schedule schedule);
}
