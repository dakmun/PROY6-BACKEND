# Proy6-Backend

Este proyecto es una API Backend para la gestión de usuarios y productos con autenticación basada en JWT. Permite realizar operaciones CRUD sobre los productos y gestionar la autenticación y autorización de usuarios.

## Clonar el Proyecto

Para clonar el repositorio en tu máquina local, ejecuta el siguiente comando en tu terminal:

```bash
git clone https://github.com/tu_usuario/proy6-backend.git
```
Luego, navega al directorio del proyecto:

```bash
cd proy6-backend
```

## Instalación de Dependencias

Para instalar todas las dependencias necesarias, ejecuta: 

```bash
npm install
```

Esto instalará todas las dependencias listadas en el archivo `package.json`.

## Configuración de Variables de Entorno

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

```plaintext
MONGODB_URI=mongodb+srv://<tu_usuario>:<tu_contraseña>@cluster0.mongodb.net/<tu_base_de_datos>?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_para_jwt
PORT=5000
```

Asegúrate de reemplazar `<tu_usuario>`, `<tu_contraseña>`, y `<tu_base_de_datos>` con la información correspondiente de tu instancia de MongoDB Atlas.

## Uso

Para iniciar el servidor, ejecuta:

```bash
npm start
```

El servidor estará disponible en `http://localhost:5000`.



# Probar la API

## Swagger UI
Puedes probar todos los endpoints de la API utilizando Swagger UI. Swagger UI permite probar de forma interactiva los endpoints sin necesidad de herramientas externas.

1. Acceder a Swagger UI:

   -  Para el entorno local: http://localhost:5000/api-docs
   -  Para el entorno de producción: https://proy6-backend.onrender.com/api-docs

2. Registrar un usuario

  - Primero, registra un nuevo usuario utilizando el endpoint `/api/user/register`.

3. Iniciar sesión del usuario

  - Luego, inicia sesión con los datos del usuario creado para recibir el token JWT.

4. Autorización con JWT

    - Haz clic en el botón "Authorize" en la parte superior derecha de Swagger UI.
    - Introduce el token JWT que obtuviste al iniciar sesión (/api/user/login) en el campo correspondiente y haz clic en "Authorize".
    - Ahora puedes probar todos los endpoints que requieren autenticación.

## Postman

También puedes probar la API utilizando Postman. A continuación se muestra cómo configurar las solicitudes:

1. **Registrar un usuario:**

   - **Método:** POST
   - **URL:** `https://proy6-backend.onrender.com/api/user/register`
   - **Body:**
     ```json
     {
       "nombre": "Juan Perez",
       "email": "juan@example.com",
       "password": "password123"
     }
     ```
   - **Respuesta esperada:**
     ```json
     {
       "token": "eyJhbGc..."
     }
     ```

2. **Iniciar sesión:**

   - **Método:** POST
   - **URL:** `https://proy6-backend.onrender.com/api/user/login`
   - **Body:**
     ```json
     {
       "email": "juan@example.com",
       "password": "password123"
     }
     ```
   - **Respuesta esperada:**
     ```json
     {
       "token": "eyJhbGc..."
     }
     ```
   - **Nota:** Guarda el token que recibes en la respuesta, ya que lo necesitarás para los endpoints que requieren autenticación.

3. **Autorización**

  - Para los endpoints que requieren autenticación, selecciona la pestaña "Authorization" en Postman:

  - **Auth Type**: Bearer Token
  - **Token**: Pega el token recibido al iniciar sesión.

  - **Nota**: Los headers `Content-Type: application/json` y `Authorization: Bearer <tu_token_jwt>` se agregan automáticamente cuando seleccionas "raw" y "JSON" en la sección 'Body' y seleccionas Bearer Token en 'Authorization'.



4. **Verificar el token JWT:**

   - **Método:** GET
   - **URL:** `https://proy6-backend.onrender.com/api/user/verifytoken`
   - **Headers:** 
     - **Authorization:** Bearer `<tu_token_jwt>`

   - **Respuesta esperada:**
     ```json
     {
       "valid": true,
       "userId": "user_id"
     }
     ```

5. **Probar otros endpoints**


## Despliegue

Este proyecto está desplegado en Render.com. Puedes acceder a la API en la URL de producción:

- [https://proy6-backend.onrender.com/](https://proy6-backend.onrender.com/)

También puedes acceder a la documentación de la API en el entorno de producción:

- [https://proy6-backend.onrender.com/api-docs](https://proy6-backend.onrender.com/api-docs)