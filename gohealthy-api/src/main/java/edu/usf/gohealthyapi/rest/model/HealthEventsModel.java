package edu.usf.gohealthyapi.rest.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HealthEventsModel {

    private String id;
    private String description;
    private ZonedDateTime createdAt;
}
