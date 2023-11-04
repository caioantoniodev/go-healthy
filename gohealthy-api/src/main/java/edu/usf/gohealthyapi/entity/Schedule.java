package edu.usf.gohealthyapi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "scheduling_date_time")
    private ZonedDateTime schedulingDateTime;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    private Doctor doctor;
}
