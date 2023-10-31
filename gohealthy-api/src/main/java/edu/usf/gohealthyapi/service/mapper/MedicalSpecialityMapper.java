package edu.usf.gohealthyapi.service.mapper;

import edu.usf.gohealthyapi.entity.MedicalSpeciality;
import edu.usf.gohealthyapi.rest.model.MedicalSpecialityModel;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MedicalSpecialityMapper {

    MedicalSpecialityMapper INSTANCE = Mappers.getMapper(MedicalSpecialityMapper.class);

    MedicalSpeciality toEntity(MedicalSpecialityModel medicalSpecialityModel);
    MedicalSpecialityModel toModel(MedicalSpeciality medicalSpeciality);
}
