package edu.usf.gohealthyapi.rest.controller;

import edu.usf.gohealthyapi.rest.model.MedicalSpecialityModel;
import edu.usf.gohealthyapi.service.MedicalSpecialityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/specialities")
public class MedicalSpecialityController {

    @Autowired
    private MedicalSpecialityService medicalSpecialityService;

    @GetMapping
    public ResponseEntity<?> getSpecialists() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(medicalSpecialityService.getSpecialists());
    }

    @PostMapping
    public ResponseEntity<?> postSpeciality(@RequestBody MedicalSpecialityModel medicalSpecialityModel) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(medicalSpecialityService.createSpeciality(medicalSpecialityModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSpeciality(@PathVariable("id") String specialityId) {
        medicalSpecialityService.deleteSpeciality(specialityId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
