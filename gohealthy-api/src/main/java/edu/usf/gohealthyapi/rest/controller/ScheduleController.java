package edu.usf.gohealthyapi.rest.controller;

import edu.usf.gohealthyapi.rest.model.ScheduleRequestModel;
import edu.usf.gohealthyapi.rest.model.ScheduleResponseModel;
import edu.usf.gohealthyapi.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<?> postSchedule(@RequestBody ScheduleRequestModel scheduleRequestModel) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(scheduleService.createSchedule(scheduleRequestModel));
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<?> getScheduleByPatient(@PathVariable("patientId") String patientId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(scheduleService.findScheduleByPatientId(patientId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?>deleteSchedule(@PathVariable("id") String scheduleId) {
        scheduleService.unschedule(scheduleId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    public ResponseEntity<?> getScheduleByPatient() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(scheduleService.findAllSchedules());
    }
}
