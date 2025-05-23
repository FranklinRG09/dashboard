package com.apiproyectodaw.apiproyectodaw.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Boolean error;
    private String message;
}
