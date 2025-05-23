package com.apiproyectodaw.apiproyectodaw.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "licenses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Licenses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String nombre; // Ejemplo: "Creative Commons", "MIT", "GPL"

    @Column(columnDefinition = "TEXT", nullable = false)
    private String descripcion; // Explicación breve de la licencia

    @Column(nullable = false, length = 255)
    private String url; // Enlace a los términos oficiales de la licencia

    // Relación con Resource (una Licencia puede estar asociada a varios recursos)
    @OneToMany(mappedBy = "licencia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Resource> recursos;
}