package edu.usf.gohealthyapi.repository;

import edu.usf.gohealthyapi.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, UUID> {
}
