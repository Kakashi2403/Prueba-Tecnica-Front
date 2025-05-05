# Prueba Técnica - Frontend (Angular 19)

Este proyecto es la interfaz de usuario desarrollada en **Angular 19** como parte de una prueba técnica. Está diseñado para integrarse con el backend correspondiente y ofrece una experiencia de usuario moderna y responsiva.

## Tecnologías utilizadas

- **Angular 19**
- **TypeScript**
- **SCSS**
- **Angular Material** (si aplica)
- **RxJS**
- **Angular CLI**

## Estructura del proyecto
Prueba-Tecnica-Front/
├── src/
│ ├── app/ # Componentes y módulos principales
│ ├── assets/ # Recursos estáticos
│ ├── environments/ # Configuraciones de entorno
│ └── index.html # Archivo HTML principal
├── angular.json # Configuración del proyecto Angular
├── package.json # Dependencias y scripts
└── README.md # Documentación del proyecto

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [Angular CLI](https://angular.io/cli) (versión 19 o superior)

## Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Kakashi2403/Prueba-Tecnica-Front.git
   cd Prueba-Tecnica-Front

2.Instala las dependencias:
npm install
3.Ejecuta la aplicación en modo desarrollo:
ng serve
4.Abre tu navegador en:
http://localhost:4200
Configuración de entornos
El proyecto utiliza archivos de entorno para manejar diferentes configuraciones. Puedes encontrar estos archivos en la carpeta src/environments/:

environment.ts: Configuración para desarrollo.

environment.prod.ts: Configuración para producción.

Asegúrate de configurar correctamente las URLs de las APIs y otras variables necesarias en estos archivos.

Scripts disponibles
ng serve: Inicia el servidor de desarrollo.

ng build: Compila la aplicación para producción.

ng test: Ejecuta las pruebas unitarias.

ng lint: Analiza el código en busca de problemas de estilo y errores.

Mejores prácticas implementadas
Componentes Standalone: Utilización de componentes independientes para una arquitectura más modular.

Signals: Implementación de la nueva API de Signals para una gestión de estado más reactiva.

Zoneless: Configuración para eliminar la dependencia de Zone.js, mejorando el rendimiento.

Lazy Loading: Carga diferida de módulos para optimizar el tiempo de carga inicial.

Prettier y ESLint: Herramientas de formateo y análisis de código para mantener la calidad del código.
Despliegue
Para compilar la aplicación para producción:
ng build --configuration production
Los archivos generados estarán en la carpeta dist/. Puedes servir estos archivos utilizando cualquier servidor HTTP estático o integrarlos en tu solución backend.

