package edu.usf.gohealthyapi.service.mapper;

import edu.usf.gohealthyapi.entity.Doctor;
import edu.usf.gohealthyapi.rest.model.DoctorModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DoctorMapper {

    DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class);

    @Mapping(source = "medicalSpecialityModel", target = "medicalSpeciality")
    Doctor toEntity(DoctorModel doctorModel);

    @Mapping(source = "medicalSpeciality", target = "medicalSpecialityModel")
    DoctorModel toModel(Doctor doctor);
}
