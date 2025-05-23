package com.apiproyectodaw.apiproyectodaw.model;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

// import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tags")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Tags {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String descripcion;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column(name = "color", nullable = false, length = 7)
    private String color; // Color en formato hexadecimal (ejemplo: #FF5733)

    // Relación con Categorías (Cada Tag pertenece a una Categoría)
    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    @JsonIgnoreProperties({ "recursos", "tags", "descripcion" })
    private Categories categoria;

    @PostConstruct
    public void init() {
        if (fechaCreacion == null) {
            fechaCreacion = LocalDateTime.now();
        }
    }
}