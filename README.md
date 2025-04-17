# Proyecto ERP en Laravel + React + SQLite

## Descripción del Proyecto

Este es un **CRM** desarrollado con **Laravel** para el backend, **React** para el frontend y **SQLite** como base de datos.

---

## Características

- **Backend**: Laravel 11
- **Frontend**: React
- **Base de Datos**: SQLite
- **Middleware**: Autenticación y Throttling
- **Estrategia branching**: Github Flow
- **Virtualización**: Docker definido

---
## Backend

### Modelo Cliente

En esta sección se describe el modelo de **Cliente**, que es una de las entidades principales en el sistema. Este modelo interactúa con la base de datos y define las relaciones con otros elementos del sistema (como oportunidades y tareas, si es necesario).

---
#### Seeder definido
---
### Controlador API

El controlador asociado al modelo de **Cliente** se encarga de manejar las peticiones y respuestas relacionadas con la gestión de clientes. Se definen las operaciones necesarias, como la creación, lectura, actualización y eliminación (CRUD) de clientes.

1. Validación de Datos de Entrada.
2. Cifrado de Contraseñas con `bcrypt`.
3. Uso de JWT para la Autenticación.
4. Refresh Tokens (Tokens de Renovación).
5. Almacenamiento Seguro del Refresh Token en Cookie HTTPOnly.
6. Invalidez de Tokens y Logout.
7. Comprobación de Autenticación y Autorización.
8. Uso de Hash para Almacenar el Refresh Token.
9. Validación y Gestión de Errores.
10. Control de Expiración del Token de Acceso.

---

### Rutas

En esta sección se describen las rutas que permiten interactuar con el sistema. Estas rutas gestionan las peticiones a la API y están asociadas a los controladores correspondientes. Se mencionan las rutas que exponen las operaciones CRUD para los clientes y cualquier otra funcionalidad relevante.

---

### Middleware Throttling Definido

El middleware de **throttling** se utiliza para limitar la cantidad de solicitudes que un usuario puede realizar en un intervalo de tiempo determinado. Esto ayuda a proteger el sistema contra abusos y sobrecargas.

---

### Middleware de Autenticación Definido

Implementar **autenticación con JWT** en una API de Laravel 11 para un **CRM**, donde:  
✅ Un usuario pueda **iniciar sesión** y obtener un token.  
✅ Solo los **usuarios autenticados** puedan acceder a los clientes.  
✅ Solo los **administradores** puedan gestionar clientes.



---

## Front-End

- **Estado global de autenticación**: Usuario, token JWT y estado de la sesión.
- **Gestión de tokens**: Almacenamiento seguro y renovación del **access token** mediante el **refresh token**.
- **Funciones del contexto**: Login, logout, verificación de usuario.
- **Manejo de errores**: Errores de autenticación y red.
- **Sincronización con la API**: Autenticación en las solicitudes a la API.
- **Escalabilidad**: Posibilidad de agregar más datos de usuario (roles, preferencias, etc.).
- **Accesibilidad y reusabilidad**: Facilitar el acceso al contexto desde cualquier parte de la aplicación.


## Instalación y Configuración

1. Clona el repositorio en tu máquina local.

   ```bash
   git clone <URL del repositorio>
