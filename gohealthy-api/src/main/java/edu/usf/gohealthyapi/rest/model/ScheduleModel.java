package edu.usf.gohealthyapi.rest.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScheduleModel {

    private UUID id;

    private ZonedDateTime schedulingDateTime;

    @JsonProperty("patient")
    private PatientModel patientModel;

    @JsonProperty("doctor")
    private DoctorModel doctorModel;
}
