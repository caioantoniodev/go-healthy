package edu.usf.gohealthyapi.service;

import edu.usf.gohealthyapi.entity.HealthEvent;
import edu.usf.gohealthyapi.entity.Patient;
import edu.usf.gohealthyapi.repository.HealthEventRepository;
import edu.usf.gohealthyapi.rest.model.HealthEventsModel;
import edu.usf.gohealthyapi.service.mapper.HealthEventsMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.util.Arrays;

@Service
@Slf4j
@RequiredArgsConstructor
public class HealthEventsService {

    private final HealthEventRepository healthEventRepository;
    private  final  PatientService patientService;

    @Value("${health-event-connector.uri}")
    private String uri;

    @Transactional
    public void syncHealthEvents() {
        var restTemplate = new RestTemplate();

        var responseEntity = restTemplate.postForEntity(uri, null, HealthEventsModel[].class);

        if (responseEntity.getStatusCode().isError())
            throw new RuntimeException();

        var healthEventsModels = responseEntity.getBody();

        if (ObjectUtils.isEmpty(healthEventsModels)) {
            log.info("nothing to sync!");
            return;
        }

        var healthEvents = Arrays.stream(healthEventsModels).map(healthEventsModel ->  {
            var entity = HealthEventsMapper.INSTANCE.toEntity(healthEventsModel);
            var patient = patientService.findPatientById(healthEventsModel.getPatientModel().getId());
            entity.setPatient(patient);
            return entity;
        }).toList();

        healthEventRepository.saveAll(healthEvents);
    }
}
