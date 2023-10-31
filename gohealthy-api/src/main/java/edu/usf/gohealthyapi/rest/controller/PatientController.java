package edu.usf.gohealthyapi.rest.controller;

import edu.usf.gohealthyapi.rest.model.PatientModel;
import edu.usf.gohealthyapi.service.PatientService;
import edu.usf.gohealthyapi.service.mapper.PatientMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping
    ResponseEntity<?> postPatient(@RequestBody PatientModel patientModel) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(patientService.createPatient(patientModel));
    }

    @PutMapping("/{id}")
    ResponseEntity<?> putPatient(@PathVariable("id") String patientId, @RequestBody PatientModel patientModel) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(patientService.updatePatient(patientId, patientModel));
    }

    @GetMapping
    ResponseEntity<?> getPatient() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(patientService.getPatient());
    }

    @GetMapping("/{id}")
    ResponseEntity<?> getPatientId(@PathVariable("id") String patientId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(PatientMapper.INSTANCE.toModel(patientService.findPatientById(patientId)));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deletePatient(@PathVariable("id") String patientId) {
        patientService.deletePatient(patientId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
