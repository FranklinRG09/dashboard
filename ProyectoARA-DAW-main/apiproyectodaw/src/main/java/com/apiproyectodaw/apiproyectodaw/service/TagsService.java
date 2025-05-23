package com.apiproyectodaw.apiproyectodaw.service;

import com.apiproyectodaw.apiproyectodaw.model.Categories;
import com.apiproyectodaw.apiproyectodaw.model.Tags;
import com.apiproyectodaw.apiproyectodaw.repository.CategoriesRepository;
import com.apiproyectodaw.apiproyectodaw.repository.TagsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagsService {

    private final TagsRepository tagsRepository;
    private final CategoriesRepository categoriesRepository;

    public TagsService(TagsRepository tagsRepository, CategoriesRepository categoriesRepository) {
        this.tagsRepository = tagsRepository;
        this.categoriesRepository = categoriesRepository;
    }

    public List<Tags> findAll() {
        return tagsRepository.findAll();
    }

    public Optional<Tags> findById(Long id) {
        return tagsRepository.findById(id);
    }

    public Tags save(Tags tag) {
        return tagsRepository.save(tag);
    }

    public void deleteById(Long id) {
        tagsRepository.deleteById(id);
    }

    public boolean existsByNombre(String nombre) {
        return tagsRepository.existsByNombre(nombre);
    }

    public Categories getCategoriaById(Long id) {
        return categoriesRepository.findById(id).orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
    }
}
