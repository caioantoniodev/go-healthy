package edu.usf.gohealthyapi.service.mapper;

import edu.usf.gohealthyapi.entity.HealthEvent;
import edu.usf.gohealthyapi.rest.model.HealthEventsModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Mapper
public interface HealthEventsMapper {

    HealthEventsMapper INSTANCE = Mappers.getMapper(HealthEventsMapper.class);

    @Mapping(source = "patientModel", target = "patient")
    HealthEvent toEntity(HealthEventsModel healthEventsModel);
}
