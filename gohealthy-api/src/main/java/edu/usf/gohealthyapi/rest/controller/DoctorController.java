package edu.usf.gohealthyapi.rest.controller;

import edu.usf.gohealthyapi.rest.model.DoctorModel;
import edu.usf.gohealthyapi.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping
    ResponseEntity<?> getDoctors() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(doctorService.getDoctors());
    }

    @PostMapping
    ResponseEntity<?> postDoctor(@RequestBody DoctorModel doctorModel) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(doctorService.createDoctor(doctorModel));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteDoctor(@PathVariable("id") String doctorId) {
        doctorService.removeDoctor(doctorId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
