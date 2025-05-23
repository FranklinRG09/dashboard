package com.apiproyectodaw.apiproyectodaw.repository;

import com.apiproyectodaw.apiproyectodaw.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByUsuarioId(Long userId);
    List<Resource> findByCategoriaId(Long categoryId);
    List<Resource> findByLicenciaId(Long licenseId);
    List<Resource> findByTipo(String tipo);
}