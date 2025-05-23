package com.apiproyectodaw.apiproyectodaw.repository;

import com.apiproyectodaw.apiproyectodaw.model.Licenses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LicensesRepository extends JpaRepository<Licenses, Long> {
    
}