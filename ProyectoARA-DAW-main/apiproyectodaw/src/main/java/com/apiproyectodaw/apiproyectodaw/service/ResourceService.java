package com.apiproyectodaw.apiproyectodaw.service;

import com.apiproyectodaw.apiproyectodaw.config.FileStorageProperties;
import com.apiproyectodaw.apiproyectodaw.model.Resource;
import com.apiproyectodaw.apiproyectodaw.repository.ResourceRepository;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;
    private final Path fileStorageLocation;

    // @Autowired
    public ResourceService(ResourceRepository resourceRepository, FileStorageProperties fileStorageProperties) {
        this.resourceRepository = resourceRepository;
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("No se pudo crear el directorio donde se almacenarán los archivos subidos.", ex);
        }
    }

    // Obtener todos los recursos
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    // Obtener un recurso por ID
    public Optional<Resource> getResourceById(Long id) {
        return resourceRepository.findById(id);
    }

    // Guardar un recurso (sin archivo)
    public Resource saveResource(Resource resource) {
        if (resource.getId() == null) {
            resource.setFechaSubida(LocalDateTime.now());
        }
        return resourceRepository.save(resource);
    }

    // Guardar un recurso con archivo
    public Resource saveResourceWithFile(Resource resource, MultipartFile file) throws IOException {
        // Guardar el archivo y actualizar la URL
        if (file != null && !file.isEmpty()) {
            String fileName = storeFile(file);
            resource.setUrlArchivo(fileName);
        }
        
        return saveResource(resource);
    }

    // Almacenar un archivo
    public String storeFile(MultipartFile file) throws IOException {
        // Normalizar el nombre del archivo
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        
        // Generar un nombre único para evitar colisiones
        String fileName = UUID.randomUUID().toString() + "_" + originalFileName;
        
        // Copiar archivo al directorio destino
        Path targetLocation = this.fileStorageLocation.resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        
        return fileName;
    }

    // Obtener archivo como recurso
    public org.springframework.core.io.Resource loadFileAsResource(String fileName) throws MalformedURLException {
        Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
        org.springframework.core.io.Resource resource = new UrlResource(filePath.toUri());
        
        if(resource.exists()) {
            return resource;
        } else {
            throw new RuntimeException("Archivo no encontrado: " + fileName);
        }
    }

    // Actualizar un recurso
    public Resource updateResource(Long id, Resource updatedResource) {
        return resourceRepository.findById(id)
            .map(resource -> {
                resource.setTitulo(updatedResource.getTitulo());
                resource.setDescripcion(updatedResource.getDescripcion());
                resource.setTipo(updatedResource.getTipo());
                
                // Solo actualizar URL si se proporciona
                if (updatedResource.getUrlArchivo() != null && !updatedResource.getUrlArchivo().isEmpty()) {
                    resource.setUrlArchivo(updatedResource.getUrlArchivo());
                }
                
                resource.setCategoria(updatedResource.getCategoria());
                resource.setLicencia(updatedResource.getLicencia());
                
                return resourceRepository.save(resource);
            })
            .orElseThrow(() -> new RuntimeException("Recurso no encontrado con id: " + id));
    }

    // Eliminar un recurso
    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }

    // Buscar recursos por usuario
    public List<Resource> getResourcesByUserId(Long userId) {
        return resourceRepository.findByUsuarioId(userId);
    }

    // Buscar recursos por categoría
    public List<Resource> getResourcesByCategoryId(Long categoryId) {
        return resourceRepository.findByCategoriaId(categoryId);
    }

    // Buscar recursos por tipo
    public List<Resource> getResourcesByType(String tipo) {
        return resourceRepository.findByTipo(tipo);
    }
}