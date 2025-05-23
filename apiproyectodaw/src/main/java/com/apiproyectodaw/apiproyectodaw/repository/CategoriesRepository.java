package com.apiproyectodaw.apiproyectodaw.repository;

import com.apiproyectodaw.apiproyectodaw.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Long> {
}
