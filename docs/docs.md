# Documentacion del Sistema 

---

## 1. Descripción 

Aplicación backend que permite a los usuarios registrar películas y series vistas, analizar estadísticas personales de visualización y exportar dichos datos en formatos CSV. Está orientada a usuarios que quieren llevar un control detallado de su historial audiovisual.

---

## 2. Funcionalidades desarrolladas

- **Registro y autenticación de usuarios**: Registro de nuevos usuarios y login mediante JWT para seguridad.  
- **Gestión de películas/series vistas**: Crear y listar registros de películas/series vistas con datos como título, género, duración y fecha vista.  
- **Estadísticas de visualización**: Cálculo de horas vistas por mes, géneros más vistos y días con mayor actividad.  
- **Exportación**: Exportar el historial completo a CSV
- **Validaciones y manejo de errores**: Validación de datos obligatorios y manejo adecuado de errores con respuestas claras.

---

## 3. Tecnologías usadas

- Node.js con Express para el servidor HTTP.  
- MongoDB con Mongoose para persistencia de datos.  
- JSON Web Tokens (JWT) para autenticación.  
- Librerías para generación de CSV.  
- dotenv para manejo de variables de entorno.

---

## 4. Endpoints disponibles

### 4.1 Registro y autenticación

| Método | Ruta              | Descripción                   | Autenticación | Datos requeridos                     |
|--------|-------------------|------------------------------|---------------|------------------------------------|
| POST   | `/api/users/register` | Registra un nuevo usuario    | No            | `{ username, email, password }`    |
| POST   | `/api/users/login`  | Inicia sesión y devuelve token | No          | `{ username, password }`            |

---

### 4.2 Películas/series vistas

| Método | Ruta          | Descripción                          | Autenticación | Datos requeridos                                |
|--------|---------------|-------------------------------------|---------------|------------------------------------------------|
| POST   | `/api/film`  | Registra una película/serie vista   | Sí            | `{ title, genre, duration, dateWatched }`      |
| GET    | `/api/film`  | Obtiene el historial completo        | Sí            | Ninguno                                        |

---

### 4.3 Estadísticas

| Método | Ruta          | Descripción                                                                                | Autenticación | Datos requeridos |
| ------ | ------------- | ------------------------------------------------------------------------------------------ | ------------- | ---------------- |
| GET    | `/api/report` | Devuelve estadísticas completas: horas por mes, género más visto y día con mayor actividad | Sí            | Ninguno          |


---

### 4.4 Exportación

| Método | Ruta              | Descripción                       | Autenticación | Datos requeridos         |
|--------|-------------------|----------------------------------|---------------|-------------------------|
| GET    | `/api/export/csv`  | Exporta historial a archivo CSV   | Sí            | Ninguno                 |


---

## 5. Comportamiento esperado

- Las rutas que requieren autenticación esperan el header:  
  `Authorization: Bearer <token>`.  
- En caso de éxito, se responde con código `200` y los datos solicitados.  
- En caso de error, se responde con códigos como:  
  - `400` para datos inválidos o faltantes (ejemplo: falta título en película).  

---


## 6. Diagrama UML

![Diagrama UML](./public/diagrama-uml.png)

---


## 7. Casos de uso implementados

### 7.1 Generación de estadísticas personales (Complejidad media/alta)

Analiza el historial audiovisual de cada usuario para generar información personalizada a partir de los registros almacenados.
Transformación realizada:

- Agrupación y procesamiento de datos para obtener:

    - Total de horas vistas por mes.
    - Género más visto.
    - Día con mayor actividad de visualización.

La lógica se encuentra modularizada en reportService.js y es consumida a través del endpoint GET /api/report.

### 7.2 Exportación del historial de visionado (Complejidad media)

Permite al usuario descargar su historial en un formato portable para utilizar en otras plataformas o conservar una copia local.
Transformación realizada:

- Conversión de objetos internos a formato .csv utilizando la librería json2csv.

Expuesto a través del endpoint GET /api/export/csv.