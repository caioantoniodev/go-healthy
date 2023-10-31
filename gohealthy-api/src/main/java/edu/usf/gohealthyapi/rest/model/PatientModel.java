package edu.usf.gohealthyapi.rest.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PatientModel {

    private String id;
    private String firstName;
    private String lastName;
    private String phone;
    private int age;
    @JsonProperty("healthEvents")
    private List<HealthEventsModel> healthEventsModel;
    @JsonProperty("address")
    private AddressModel addressModel;
}
