package edu.usf.gohealthyapi.rest.controller;

import edu.usf.gohealthyapi.rest.model.ScheduleModel;
import edu.usf.gohealthyapi.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<?> postSchedule(@RequestBody ScheduleModel scheduleModel) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(scheduleService.createSchedule(scheduleModel));
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<?> getScheduleByPatient(@PathVariable("patientId") String patientId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(scheduleService.findScheduleByPatientId(patientId));
    }

    @GetMapping
    public ResponseEntity<?> getScheduleByPatient() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(scheduleService.findAllSchedules());
    }
}
