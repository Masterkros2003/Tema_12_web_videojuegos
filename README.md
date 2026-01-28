# Explorador de Videojuegos - GameExplore

Este proyecto es una aplicación web desarrollada con React y Vite que permite explorar videojuegos utilizando la API de [RAWG](https://rawg.io/).

## 🚀 Características

*   **Página Principal**: Carrusel con juegos populares y secciones destacadas.
*   **Buscador**: Búsqueda de videojuegos en tiempo real.
*   **Catálogo**: Visualización de juegos en grid con diseño responsive.
*   **Detalle**: Información detallada de cada juego (plataformas, géneros, rating, descripción).
*   **Diseño Moderno**: Interfaz oscura (Dark Mode) estilizada con Tailwind CSS.

## 🛠️ Tecnologías

*   **React** (v19) - Librería de UI.
*   **Vite** - Build tool y servidor de desarrollo.
*   **Tailwind CSS** (v4) - Framework de estilos.
*   **React Router DOM** - Manejo de rutas y navegación.
*   **Lucide React** - Iconografía.

## 📋 Requisitos de Instalación

1.  Clonar el repositorio.
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Crear un archivo `.env` en la raíz del proyecto y añadir tu API Key de RAWG:
    ```env
    VITE_RAWG_API_KEY=tu_clave_aqui
    ```
    *Puedes obtener una clave gratuita en [rawg.io/apidocs](https://rawg.io/apidocs).*

## ▶️ Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## 📦 Estructura del Proyecto

*   `src/components`: Componentes reutilizables (Header, Footer, GameCard...).
*   `src/pages`: Vistas principales (HomePage, GamesPage, GameDetailPage).
*   `src/services`: Lógica de conexión con la API.

## 📝 Evaluación

Este proyecto cumple con los siguientes criterios:
- [x] **Diseño**: Atractivo y responsive.
- [x] **Componentes**: Arquitectura modular.
- [x] **Props/State**: Gestión eficiente del estado.
- [x] **Router**: Navegación SPA fluida.
- [x] **API**: Consumo de datos reales y manejo de errores.

---
Desarrollado para Diseño de Interfaces Web.
