package com.apiproyectodaw.apiproyectodaw.service;

import com.apiproyectodaw.apiproyectodaw.model.User;
import com.apiproyectodaw.apiproyectodaw.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Obtener todos los usuarios
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Obtener usuario por ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Obtener usuario por email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Guardar usuario (crear o actualizar)
    public User saveUser(User user) {
        // Si es un nuevo usuario, establecer la fecha de registro
        if (user.getId() == null) {
            user.setFechaRegistro(LocalDateTime.now());
        }
        return userRepository.save(user);
    }

    // Actualizar un usuario
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
            .map(user -> {
                user.setNombre(updatedUser.getNombre());
                // No actualizamos el email para evitar duplicados
                
                // Solo actualizar password si se proporciona uno nuevo
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    // Aquí deberías aplicar un hash a la contraseña antes de guardarla
                    user.setPassword(updatedUser.getPassword());
                }
                
                user.setRol(updatedUser.getRol());
                return userRepository.save(user);
            })
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }

    // Eliminar un usuario
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Verificar si existe un email
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}