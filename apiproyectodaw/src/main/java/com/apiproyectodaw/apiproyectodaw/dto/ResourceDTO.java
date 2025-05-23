package com.apiproyectodaw.apiproyectodaw.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceDTO {
    private String titulo;
    private String descripcion;
    private String tipo;
    private Long idUsuario;
    private Long idCategoria;
    private Long idLicencia;
    // Para recursos remotos (YouTube, etc.)
    private String urlExterna;
}