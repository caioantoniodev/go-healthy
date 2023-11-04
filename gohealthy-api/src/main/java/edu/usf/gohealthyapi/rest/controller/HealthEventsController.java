package edu.usf.gohealthyapi.rest.controller;

import edu.usf.gohealthyapi.rest.model.HealthEventsModel;
import edu.usf.gohealthyapi.service.HealthEventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health-events")
public class HealthEventsController {

    @Autowired
    private HealthEventsService healthEventsService;

    @PostMapping
    ResponseEntity<?> postEvents() {
        healthEventsService.syncHealthEvents();
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
