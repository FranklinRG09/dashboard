package com.apiproyectodaw.apiproyectodaw.service;

import com.apiproyectodaw.apiproyectodaw.model.Categories;
import com.apiproyectodaw.apiproyectodaw.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriesService {

    @Autowired
    private CategoriesRepository categoriesRepository;

    public List<Categories> getAllCategories() {
        return categoriesRepository.findAll();
    }

    public Optional<Categories> getCategoryById(Long id) {
        return categoriesRepository.findById(id);
    }

    public Categories saveCategory(Categories category) {
        return categoriesRepository.save(category);
    }

    public Categories updateCategory(Long id, Categories updatedCategory) {
        return categoriesRepository.findById(id).map(category -> {
            category.setNombre(updatedCategory.getNombre());
            category.setDescripcion(updatedCategory.getDescripcion());
            return categoriesRepository.save(category);
        }).orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
    }

    public void deleteCategory(Long id) {
        categoriesRepository.deleteById(id);
    }
}
