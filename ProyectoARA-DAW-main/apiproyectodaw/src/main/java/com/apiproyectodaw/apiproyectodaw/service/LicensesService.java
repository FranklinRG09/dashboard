package com.apiproyectodaw.apiproyectodaw.service;

import com.apiproyectodaw.apiproyectodaw.model.Licenses;
import com.apiproyectodaw.apiproyectodaw.repository.LicensesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LicensesService {

    @Autowired
    private LicensesRepository licensesRepository;

    public List<Licenses> getAllLicenses() {
        return licensesRepository.findAll();
    }

    public Optional<Licenses> getLicenseById(Long id) {
        return licensesRepository.findById(id);
    }

    public Licenses saveLicense(Licenses license) {
        return licensesRepository.save(license);
    }

    public Licenses updateLicense(Long id, Licenses updatedLicense) {
        return licensesRepository.findById(id).map(license -> {
            license.setNombre(updatedLicense.getNombre());
            license.setDescripcion(updatedLicense.getDescripcion());
            license.setUrl(updatedLicense.getUrl());
            return licensesRepository.save(license);
        }).orElseThrow(() -> new RuntimeException("Licencia no encontrada"));
    }

    public void deleteLicense(Long id) {
        licensesRepository.deleteById(id);
    }
}