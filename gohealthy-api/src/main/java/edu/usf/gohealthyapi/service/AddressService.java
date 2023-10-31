package edu.usf.gohealthyapi.service;

import edu.usf.gohealthyapi.entity.Address;
import edu.usf.gohealthyapi.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public Address findAddressById(String addressId) {
        return addressRepository.findById(UUID.fromString(addressId)).orElseThrow();
    }
}
