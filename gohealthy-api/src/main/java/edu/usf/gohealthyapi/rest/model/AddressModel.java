package edu.usf.gohealthyapi.rest.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressModel {
    private String id;
    private String street;
    private String zipCode;
    private String complement;
    private Long number;
}
