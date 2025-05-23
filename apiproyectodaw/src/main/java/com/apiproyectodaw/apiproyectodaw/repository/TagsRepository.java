package com.apiproyectodaw.apiproyectodaw.repository;

import com.apiproyectodaw.apiproyectodaw.model.Tags;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagsRepository extends JpaRepository<Tags, Long> {
    boolean existsByNombre(String nombre);
}