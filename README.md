## Proyecto ERP en Laravel + React + SQLite

## Descripción del proyecto

Esta aplicación es un sistema de gestión de relaciones con clientes (CRM) diseñado para organizar y optimizar el seguimiento de **clientes**, **oportunidades de venta** y **tareas** dentro de un flujo de trabajo comercial. Permite gestionar la información de los clientes de manera estructurada, todo accesible a través de una interfaz clara y fácil de usar.

### Características Principales:

* **Gestión de Clientes**: Almacena y organiza la información de los clientes, incluyendo datos de contacto.
* **Oportunidades de Venta**: Visualiza los estados y el potencial de cada oportunidad de venta, permitiendo priorizar esfuerzos comerciales.
* **Gestión de Tareas**: Asegura que el equipo esté siempre al tanto de las actividades necesarias para avanzar en cada proyecto.

Este CRM fue desarrollado con el objetivo de crear un proyecto de portfolio funcional y alineado con necesidades comerciales reales.

## Características

* **Backend**: Laravel 12
* **Frontend**: React, TailwindCSS
* **Base de Datos**: SQLite
* **Estrategia branching**: Github Flow
* **Contenedorización**: Docker

## Backend

### Base de datos

* Modelos usuario, cliente, oportunidad, tarea
* Migraciones usuario, cliente, oportunidad, tarea
* Seeders usuario, cliente, oportunidad, tarea
* Relaciones entre modelos;

  * **Cliente** ➡️ tiene muchas ➡️ **Oportunidades**
  * **Oportunidad** ⬅️ pertenece a ⬅️ **Cliente**
  * **Oportunidad** ➡️ tiene muchas ➡️ **Tareas**
  * **Tarea** ⬅️ pertenece a ⬅️ **Oportunidad**
  * **Usuario** 🚫 tiene relación directa de negocio con Clientes, Oportunidades o Tareas (se usa para autenticación).

### Controladores API

**AuthController**

* **✅ Validación:** Datos de entrada.
* **✅ Cifrado:** Contraseñas con bcrypt.
* **✅ Autenticación:** JWT.
* **✅ Refresh:** Tokens de renovación.
* **✅ Hash:** Almacenamiento seguro de refresh token.
* **✅ Seguridad:** Refresh token en cookie HTTPOnly.
* **✅ Logout:** Invalidez de tokens.
* **✅ Errores:** Validación y gestión.

**ClientController**

* **✅ Validación:** Datos de entrada.
* **✅ Autenticación:** Para obtener clientes hay que estar loggeado y solo los administradores pueden modificar o eliminar clientes.
* **✅ CRUD:** Completo.
* **✅ Filtros:** Dinámicos y ordenación.
* **✅ Errores:** Gestión y respuestas estructuradas.
* **✅ Paginación**

**OpportunityController**

* **✅ Detalle:** Muestra una oportunidad con cliente y tareas.
* **✅ Validación:** De datos de entrada en cada operación.
* **✅ Relaciones:** Carga la relación con el cliente y las tareas.
* **✅ Errores:** Manejo de "no encontrado" y errores de validación.

**TaskController**

* **✅ Detalle:** Muestra una tarea con su oportunidad.
* **✅ Total:** Obtiene el número total de tareas incompletas.
* **✅ Validación:** De datos de entrada en cada operación.
* **✅ Relaciones:** Carga la relación con la oportunidad.
* **✅ Errores:** Manejo de "no encontrado" y errores de validación.

## API

Uso de Métodos HTTP: Cumple con la semántica de GET, POST, PUT/PATCH, DELETE.
Identificación de Recursos: Las URIs son claras y específicas para los recursos.
Arquitectura separada Cliente-Servidor.

❌ Puntos de Mejora:

* Endpoints /getuser /clients/total y /tasks/total podrían integrarse en un array.

### Rutas API

* **POST:** `/register`, `/login`, `/refresh`, `/getuser`, `/logout`
* **GET:** `/user`, `/clients`, `/clients/total`, `/opportunities`, `/tasks`, `/tasks/total`
* **PUT:** `/clients/{id}`
* **PATCH:** `/clients/{id}`, `/opportunities/{id}`, `/tasks/{id}`
* **DELETE:** `/clients/{id}`

### Rutas Web

* **GET:** `/`,`/login`,`/dashboard`,`/clients`,`/opportunities`,`/tasks`

## Middleware

**IsAdmin**

* **🔒 Protección:** Verifica si el usuario autenticado tiene el rol de 'admin'.
* **✅ Autorización:** Permite el acceso si el rol es 'admin'.
* **🚫 Denegación:** Retorna un error 403 (No autorizado) si el rol no es 'admin' o no hay usuario autenticado.

**IsUserAuth**

* **🔑 Autenticación:** Verifica si hay un usuario autenticado mediante el guard 'api'.
* **✅ Acceso:** Permite la petición si un usuario está autenticado.
* **🚫 Denegación:** Retorna un error 401 (No autenticado) si no hay usuario autenticado.

**Throttling**

* **⏱️ Control de Tasa:** Limita el número de peticiones en un periodo de tiempo.
* **⚙️ Configurable:** Permite definir el número máximo de intentos y la duración del bloqueo.
* **🛡️ Protección:** Ayuda a prevenir ataques de fuerza bruta y denegación de servicio (DoS).

## Front-End

### Características Principales

* **Interfaz intuitiva y amigable**
* **Iconos importados**
* **Componentes reutilizables con una interfaz unificada**
* **Estado global de autenticación**: Usuario, token JWT y estado de la sesión.
* **Gestión de tokens mediante services**: Almacenamiento seguro y renovación del **access token** mediante refresh tokens.
* **Funciones del contexto**: Login, logout, verificación de usuario.
* **Manejo de errores**: Errores de autenticación y red.
* **Sincronización con la API**: Autenticación en las solicitudes a la API.
* **Escalabilidad**: Posibilidad de agregar más datos de usuario (roles, preferencias, etc.).
* **Accesibilidad y reusabilidad**: Facilitar el acceso al contexto desde cualquier parte de la aplicación.

## Pruebas unitarias

## CORS

## Instalación y Configuración

1. Clona el repositorio en tu máquina local.

   ```bash
   git clone <URL del repositorio>
   ```

2. Construye el contenedor Docker.

   ```bash
   sudo docker build -t demo/laravel:0.1 .
   ```

3. Inicia el contenedor Docker.

   ```bash
   sudo docker run -p 8000:80 demo/laravel:0.1
