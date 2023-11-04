package edu.usf.gohealthyapi.rest.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HealthEventsModel {

    private String id;
    private String description;
    @JsonProperty("patient")
    private PatientModel patientModel;
    private ZonedDateTime createdAt;
}
