# Parcial 1 - DAW

## Proyecto: Plataforma de Intercambio de Recursos Educativos Abiertos (REA) 

# Integrantes

-  **Nombre:** Walter Alexander Galicia Gertrudis - **Carnet:** GG14054
-  **Nombre:** Alexandra Quinteros Cárcamo - **Carnet:** QC23006
-  **Nombre:** Ricardo Adan Patiño Hernandez - **Carnet:** PH23011
-  **Nombre:** Franklin Imanol Ramírez Gómez - **Carnet:** RG22059
-  **Nombre:** Gabriel Ernesto Díaz Galdámez - **Carnet:** DG22023

# Intrucciones
```bash
1. docker compose build --no-cache
2. docker compose up
```

La app será accesible mediante la URL: http://localhost:4200/

## En caso de ser necesario (si los usuarios no se cargan en la bd)
```bash
INSERT INTO users (nombre, email, password, rol, fecha_registro) VALUES
('Walter Galicia', 'walter@example.com', '1234', 'ADMIN', NOW()),
('Alexandra Quinteros', 'alexandra@example.com', '1234', 'ESTUDIANTE', NOW()),
('Ricardo Patiño', 'ricardo@example.com', '1234', 'TUTOR', NOW()),
('Franklin Ramírez', 'franklin@example.com', '1234', 'ESTUDIANTE', NOW()),
('Gabriel Díaz', 'gabriel@example.com', '1234', 'ESTUDIANTE', NOW());