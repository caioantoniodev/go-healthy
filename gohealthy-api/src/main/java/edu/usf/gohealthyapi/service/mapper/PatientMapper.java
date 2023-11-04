package edu.usf.gohealthyapi.service.mapper;

import edu.usf.gohealthyapi.entity.Patient;
import edu.usf.gohealthyapi.rest.model.PatientModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Mapper(componentModel = "spring")
public interface PatientMapper {

    PatientMapper INSTANCE = Mappers.getMapper(PatientMapper.class);

    @Mapping(source = "addressModel", target = "address")
    @Mapping(source = "healthEventsModel", target = "healthEvents")
    Patient toEntity(PatientModel patientModel);

    @Mapping(source = "address", target = "addressModel")
    @Mapping(source = "healthEvents", target = "healthEventsModel")
    PatientModel toModel(Patient patient);
}
