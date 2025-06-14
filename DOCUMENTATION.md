# Documentación del Proyecto WinIcons

## Descripción General

Este proyecto es una aplicación web moderna construida con Next.js que permite a los usuarios gestionar y explorar iconos. La aplicación incluye funcionalidades de autenticación, gestión de perfiles y una interfaz interactiva para explorar iconos.

## Estructura del Proyecto

### Directorios Principales

#### `/app`

- **layout.tsx**: Define el diseño principal de la aplicación
- **page.tsx**: Página principal de la aplicación
- **/my-icons**: Sección para gestionar iconos del usuario
- **/profile**: Gestión del perfil de usuario
- **/auth-pages**: Páginas relacionadas con la autenticación
- **/protected**: Rutas protegidas que requieren autenticación
- **actions.ts**: Contiene las acciones del servidor para la aplicación

#### `/components`

- **category-sidebar.tsx**: Barra lateral para navegación por categorías
- **hero.tsx**: Componente principal de la página de inicio
- **icon-list.tsx**: Lista de iconos con funcionalidades de búsqueda y filtrado
- **header-auth.tsx**: Componente de autenticación en el encabezado
- **form-message.tsx**: Componente para mensajes de formulario
- **theme-switcher.tsx**: Selector de tema claro/oscuro
- **/ui**: Componentes de interfaz de usuario reutilizables
- **/typography**: Componentes de tipografía

### Tecnologías Principales

- Next.js como framework principal
- TypeScript para tipado estático
- Tailwind CSS para estilos
- Sistema de autenticación integrado
- Middleware para protección de rutas

## Funcionalidades Principales

### Sistema de Autenticación

El sistema de autenticación está implementado usando Supabase y ofrece las siguientes funcionalidades:

#### Registro de Usuarios

- Validación de email y contraseña
- Verificación por correo electrónico
- Redirección automática después del registro
- Manejo de errores y mensajes de estado

#### Inicio de Sesión

- Autenticación con email y contraseña
- Redirección a área protegida después del login
- Manejo de sesiones persistentes
- Protección de rutas privadas

#### Recuperación de Contraseña

- Solicitud de restablecimiento por email
- Validación de tokens de recuperación
- Actualización segura de contraseñas
- Confirmación de contraseñas

### Gestión de Iconos

#### Exploración de Iconos

- Vista en cuadrícula de iconos disponibles
- Filtrado por categorías
- Búsqueda por nombre
- Vista detallada de cada icono

#### Características de los Iconos

- Previsualización en tiempo real
- Información detallada:
  - Nombre
  - Descripción
  - Categoría
  - Fecha de creación
  - Formato
- Contador de descargas

#### Interfaz de Usuario

- Diseño responsivo con Tailwind CSS
- Modo oscuro/claro
- Navegación intuitiva
- Componentes modulares

### Características Técnicas Detalladas

#### Gestión de Estado

- Uso de React Hooks para estado local
- Manejo de estados de carga
- Gestión de errores
- Actualización en tiempo real

#### Optimización de Rendimiento

- Carga lazy de componentes
- Optimización de imágenes
- Caché de datos
- Manejo eficiente de recursos

#### Seguridad

- Protección de rutas
- Validación de formularios
- Manejo seguro de sesiones
- Sanitización de datos

## Configuración del Proyecto

El proyecto utiliza varias configuraciones importantes:

- `next.config.ts`: Configuración de Next.js
- `tailwind.config.ts`: Configuración de Tailwind CSS
- `tsconfig.json`: Configuración de TypeScript
- `postcss.config.js`: Configuración de PostCSS

## Desarrollo

Para comenzar a desarrollar:

1. Instalar dependencias: `npm install`
2. Ejecutar en desarrollo: `npm run dev`
3. Construir para producción: `npm run build`

## Notas Adicionales

- El proyecto sigue las mejores prácticas de Next.js 13+
- Implementa un sistema de rutas moderno con App Router
- Utiliza componentes del lado del servidor y del cliente según sea necesario
- Incluye manejo de estado y efectos secundarios

## Backend y Base de Datos

### Arquitectura del Backend

#### Supabase como Backend

- **Características Principales**:
  - Base de datos PostgreSQL
  - Autenticación integrada
  - Almacenamiento de archivos
  - API RESTful automática
  - Funciones en tiempo real

#### Integración con Next.js

- **Cliente del Servidor**:
  - Manejo de sesiones
  - Operaciones seguras
  - Middleware de autenticación
  - Cookies y headers

### Base de Datos

#### Esquema de la Base de Datos

##### Tabla de Usuarios (auth.users)

- **Campos**:
  - `id`: UUID (clave primaria)
  - `email`: string (único)
  - `created_at`: timestamp
  - `updated_at`: timestamp
  - `last_sign_in`: timestamp

##### Tabla de Iconos (public.icons)

- **Campos**:
  - `id`: UUID (clave primaria)
  - `name`: string
  - `description`: text
  - `file_url`: string
  - `download_count`: integer
  - `created_at`: timestamp
  - `category_id`: UUID (clave foránea)
  - `user_id`: UUID (clave foránea)

##### Tabla de Categorías (public.categories)

- **Campos**:
  - `id`: UUID (clave primaria)
  - `name`: string
  - `created_at`: timestamp

#### Relaciones

- **Iconos - Categorías**:

  - Relación muchos a uno
  - Un icono pertenece a una categoría
  - Una categoría puede tener múltiples iconos

- **Iconos - Usuarios**:
  - Relación muchos a uno
  - Un usuario puede subir múltiples iconos
  - Cada icono pertenece a un usuario

### Autenticación y Autorización

#### Sistema de Autenticación

- **Características**:
  - Autenticación por email/contraseña
  - Verificación de email
  - Recuperación de contraseña
  - Sesiones persistentes

#### Middleware de Autenticación

- **Funcionalidades**:
  - Verificación de sesiones
  - Protección de rutas
  - Redirección automática
  - Manejo de tokens

### Operaciones de Datos

#### Consultas a la Base de Datos

- **Tipos de Operaciones**:
  - Inserción de iconos
  - Actualización de metadatos
  - Eliminación de registros
  - Consultas filtradas

#### Optimización de Consultas

- **Técnicas**:
  - Índices en campos frecuentes
  - Paginación de resultados
  - Caché de consultas
  - Consultas optimizadas

### Almacenamiento de Archivos

#### Gestión de Iconos

- **Características**:
  - Almacenamiento en Supabase Storage
  - Optimización de imágenes
  - Control de acceso
  - URLs seguras

#### Procesamiento de Archivos

- **Operaciones**:
  - Validación de tipos
  - Compresión de imágenes
  - Generación de miniaturas
  - Limpieza automática

### Seguridad

#### Protección de Datos

- **Medidas**:
  - Encriptación en tránsito
  - Encriptación en reposo
  - Tokens JWT
  - Políticas de acceso

#### Políticas de Seguridad

- **Niveles**:
  - Acceso público
  - Acceso autenticado
  - Acceso por rol
  - Acceso por propietario

### Monitoreo y Logging

#### Sistema de Logging

- **Tipos de Logs**:
  - Logs de autenticación
  - Logs de operaciones
  - Logs de errores
  - Logs de rendimiento

#### Métricas

- **Indicadores**:
  - Tiempo de respuesta
  - Uso de recursos
  - Tasa de errores
  - Actividad de usuarios

## Componentes Principales

### Componentes de Navegación

#### CategorySidebar

- **Funcionalidad**: Navegación por categorías de iconos
- **Características**:
  - Vista de lista de categorías
  - Filtrado dinámico de iconos
  - Diseño responsivo con menú móvil
  - Estado visual de categoría seleccionada
  - Integración con Supabase para datos en tiempo real
- **Estados**:
  - Carga de categorías
  - Manejo de errores
  - Menú móvil expandido/colapsado

#### HeaderAuth

- **Funcionalidad**: Gestión de autenticación y perfil de usuario
- **Características**:
  - Menú desplegable de usuario
  - Acceso rápido a funcionalidades principales
  - Botones de inicio/registro de sesión
  - Verificación de variables de entorno
- **Opciones de Usuario**:
  - Configuración de perfil
  - Gestión de iconos personales
  - Subida de nuevos iconos
  - Cierre de sesión

### Componentes de Visualización

#### IconList

- **Funcionalidad**: Visualización y gestión de iconos
- **Características**:
  - Vista en cuadrícula responsiva
  - Filtrado por categorías
  - Búsqueda por nombre
  - Previsualización detallada
- **Interactividad**:
  - Descarga de iconos
  - Vista detallada en modal
  - Contador de descargas
  - Estados de carga y error

### Componentes de UI

#### ThemeSwitcher

- **Funcionalidad**: Cambio entre temas claro/oscuro
- **Características**:
  - Persistencia de preferencia
  - Transiciones suaves
  - Integración con Tailwind

#### FormMessage

- **Funcionalidad**: Mensajes de formulario
- **Características**:
  - Estados de éxito/error
  - Estilos contextuales
  - Animaciones de transición

### Componentes de Autenticación

#### Formularios de Autenticación

- **Funcionalidades**:
  - Registro de usuario
  - Inicio de sesión
  - Recuperación de contraseña
  - Validación de campos
- **Características**:
  - Manejo de errores
  - Redirecciones automáticas
  - Mensajes de estado
  - Integración con Supabase

## Flujos de Usuario

### Registro y Autenticación

1. Usuario accede a la página de registro
2. Completa el formulario con email y contraseña
3. Recibe email de verificación
4. Verifica su cuenta
5. Inicia sesión con credenciales

### Exploración de Iconos

1. Usuario navega por categorías
2. Filtra por nombre o categoría
3. Visualiza detalles del icono
4. Descarga el icono seleccionado

### Gestión de Perfil

1. Accede al menú de usuario
2. Configura preferencias
3. Gestiona iconos personales
4. Sube nuevos iconos

## Configuración Técnica Detallada

### Middleware y Seguridad

- **Middleware de Autenticación**:
  - Intercepta todas las rutas excepto archivos estáticos
  - Manejo de sesiones con Supabase
  - Protección de rutas privadas
  - Excepciones para recursos estáticos:
    - Archivos de imagen (.svg, .png, .jpg, .jpeg, .gif, .webp)
    - Archivos estáticos de Next.js
    - Favicon

### Sistema de Estilos

- **Configuración de Tailwind**:
  - Modo oscuro/claro con clase
  - Sistema de colores personalizado:
    - Colores primarios y secundarios
    - Estados (destructive, muted, accent)
    - Componentes (popover, card)
  - Diseño responsivo:
    - Breakpoints personalizados
    - Contenedores centrados
    - Padding adaptativo
  - Animaciones:
    - Transiciones suaves
    - Efectos de acordeón
    - Keyframes personalizados

### Manejo de Datos

#### Estructura de la Base de Datos

- **Tabla de Iconos**:

  - ID único
  - Nombre
  - Descripción
  - URL del archivo
  - Contador de descargas
  - Fecha de creación
  - Categoría (relación)

- **Tabla de Categorías**:

  - ID único
  - Nombre
  - Relación con iconos

- **Tabla de Usuarios**:
  - Información de autenticación
  - Preferencias
  - Relaciones con iconos

#### Operaciones de Datos

- **Consultas Optimizadas**:

  - Filtrado por categorías
  - Búsqueda por nombre
  - Paginación de resultados
  - Ordenamiento dinámico

- **Manejo de Archivos**:
  - Almacenamiento de iconos
  - Optimización de imágenes
  - Gestión de descargas
  - Validación de tipos

### Optimización y Rendimiento

#### Optimización de Imágenes

- **Procesamiento**:
  - Redimensionamiento automático
  - Compresión optimizada
  - Formatos modernos (WebP)
  - Caché de imágenes

#### Caché y Estado

- **Estrategias de Caché**:
  - Caché del lado del cliente
  - Caché del servidor
  - Invalidación inteligente
  - Estado persistente

#### Rendimiento Frontend

- **Optimizaciones**:
  - Carga lazy de componentes
  - Code splitting
  - Prefetching de rutas
  - Optimización de fuentes

## Guía de Desarrollo

### Requisitos del Sistema

- Node.js 18+
- npm o yarn
- Supabase cuenta
- Variables de entorno configuradas

### Configuración del Entorno

1. Clonar el repositorio
2. Instalar dependencias
3. Configurar variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Otras variables específicas

### Scripts Disponibles

- `npm run dev`: Desarrollo local
- `npm run build`: Construcción para producción
- `npm run start`: Iniciar en producción
- `npm run lint`: Verificar código
- `npm run test`: Ejecutar pruebas

### Convenciones de Código

- **Estructura de Archivos**:

  - Componentes en `/components`
  - Páginas en `/app`
  - Utilidades en `/utils`
  - Tipos en `/types`

- **Estilos**:

  - Tailwind para estilos
  - CSS Modules cuando sea necesario
  - Variables CSS para temas

- **Componentes**:
  - Componentes funcionales
  - Hooks personalizados
  - Props tipadas
  - Documentación JSDoc

## Utilidades y Herramientas

### Utilidades Generales

#### Funciones de Redirección

- **encodedRedirect**:
  - Manejo de redirecciones con mensajes
  - Soporte para mensajes de éxito y error
  - Codificación automática de parámetros
  - Integración con el sistema de navegación

### Utilidades de Supabase

#### Cliente de Supabase

- **Configuración del Cliente**:
  - Cliente del lado del servidor
  - Cliente del lado del navegador
  - Manejo de sesiones
  - Configuración de variables de entorno

#### Middleware de Supabase

- **Funcionalidades**:
  - Actualización de sesiones
  - Manejo de tokens
  - Protección de rutas
  - Validación de autenticación

#### Verificación de Variables de Entorno

- **Comprobaciones**:
  - Validación de claves de API
  - Verificación de URLs
  - Mensajes de error descriptivos
  - Prevención de errores de configuración

## Manejo de Errores

### Sistema de Errores

#### Errores de Autenticación

- **Tipos de Errores**:
  - Credenciales inválidas
  - Sesión expirada
  - Token inválido
  - Permisos insuficientes

#### Errores de Datos

- **Categorías**:
  - Errores de validación
  - Errores de base de datos
  - Errores de red
  - Errores de formato

### Manejo de Errores en la UI

#### Componentes de Error

- **Tipos de Mensajes**:
  - Mensajes de error
  - Mensajes de éxito
  - Mensajes de advertencia
  - Mensajes informativos

#### Estados de Error

- **Estados**:
  - Carga fallida
  - Datos no encontrados
  - Errores de validación
  - Errores de red

### Logging y Monitoreo

#### Sistema de Logging

- **Características**:
  - Logs de error
  - Logs de actividad
  - Logs de rendimiento
  - Logs de seguridad

#### Monitoreo

- **Métricas**:
  - Tiempo de respuesta
  - Tasa de errores
  - Uso de recursos
  - Actividad de usuarios

## Buenas Prácticas

### Desarrollo

#### Código Limpio

- **Principios**:
  - Nombres descriptivos
  - Funciones pequeñas
  - DRY (Don't Repeat Yourself)
  - KISS (Keep It Simple, Stupid)

#### Testing

- **Tipos de Tests**:
  - Tests unitarios
  - Tests de integración
  - Tests end-to-end
  - Tests de rendimiento

### Seguridad

#### Mejores Prácticas

- **Aspectos**:
  - Validación de entrada
  - Sanitización de datos
  - Protección CSRF
  - Headers de seguridad

#### Autenticación

- **Medidas**:
  - Tokens seguros
  - Sesiones expirables
  - Protección de rutas
  - Validación de permisos

### Rendimiento

#### Optimizaciones

- **Técnicas**:
  - Lazy loading
  - Code splitting
  - Caching
  - Minificación

#### Monitoreo

- **Métricas**:
  - Tiempo de carga
  - Uso de memoria
  - Tiempo de respuesta
  - Rendimiento de red

## Componentes de UI

### Componentes Base

#### Button

- **Variantes**:
  - Default: Estilo principal
  - Destructive: Acciones destructivas
  - Outline: Borde con fondo transparente
  - Secondary: Estilo secundario
  - Ghost: Sin fondo
  - Link: Estilo de enlace
  - Blue: Estilo personalizado azul
- **Tamaños**:
  - Default: 40px altura
  - Small: 36px altura
  - Large: 44px altura
  - Icon: 40x40px
- **Características**:
  - Estados hover
  - Estados disabled
  - Focus visible
  - Transiciones suaves

#### Badge

- **Funcionalidad**: Etiquetas y estados
- **Características**:
  - Variantes de color
  - Tamaños personalizables
  - Estilos contextuales

#### Checkbox

- **Funcionalidad**: Selección múltiple
- **Características**:
  - Estados checked/unchecked
  - Estados disabled
  - Estilos personalizados

### Componentes de Formulario

#### Input

- **Funcionalidad**: Campos de entrada
- **Características**:
  - Validación
  - Estados de error
  - Placeholders
  - Tipos de entrada

#### Label

- **Funcionalidad**: Etiquetas de formulario
- **Características**:
  - Asociación con inputs
  - Estilos contextuales
  - Accesibilidad

### Componentes de Navegación

#### DropdownMenu

- **Funcionalidad**: Menús desplegables
- **Características**:
  - Posicionamiento inteligente
  - Animaciones
  - Submenús
  - Separadores

## Estructura de la Aplicación

### Organización de Componentes

#### Jerarquía

- **Componentes Base**:

  - UI primitivos
  - Componentes reutilizables
  - Hooks personalizados

- **Componentes Compuestos**:

  - Combinaciones de componentes base
  - Lógica de negocio
  - Estados compartidos

- **Páginas**:
  - Rutas de la aplicación
  - Layouts específicos
  - Estados globales

### Patrones de Diseño

#### Componentes

- **Atomic Design**:
  - Átomos (botones, inputs)
  - Moléculas (formularios, cards)
  - Organismos (secciones, layouts)
  - Templates (páginas)
  - Páginas (vistas finales)

#### Estado

- **Gestión de Estado**:
  - Estado local (useState)
  - Estado compartido (Context)
  - Estado global (Redux/Zustand)
  - Estado del servidor (SWR/React Query)

### Estilos y Temas

#### Sistema de Diseño

- **Tokens de Diseño**:
  - Colores
  - Tipografía
  - Espaciado
  - Bordes
  - Sombras

#### Temas

- **Modo Claro**:

  - Colores claros
  - Contraste optimizado
  - Sombras suaves

- **Modo Oscuro**:
  - Colores oscuros
  - Contraste ajustado
  - Sombras invertidas

### Accesibilidad

#### Características

- **ARIA**:
  - Roles
  - Estados
  - Etiquetas
  - Descripciones

#### Navegación

- **Teclado**:
  - Focus visible
  - Atajos
  - Orden de tabulación
  - Skip links

#### Contenido

- **Semántica**:
  - HTML semántico
  - Estructura jerárquica
  - Textos alternativos
  - Contraste de color
