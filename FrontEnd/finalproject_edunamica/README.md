###############Proyecto Edunámica Nosara#########################################################3
-------------Información General
Nombre del Proyecto: Proyecto Edunámica Nosara
## Enlace al Repositorio
Puedes encontrar el código fuente del proyecto en [GitHub](https://github.com/mirthaLopez/FinalProject_Edunamica.git).

---------------Descripción:
Este proyecto es una página web para la visualización de los cursos disponibles en la institución. Los estudiantes pueden realizar prematriculas y pagos de los cursos. Además, se cuenta con un sistema para la gestión administrativa de cursos, matriculas y usuarios.

----------------Propósito:
Facilitar a los estudiantes la visualización de los cursos, realizar prematriculas y pagos. Además, proporciona una intranet para los administradores donde pueden gestionar los cursos, matriculas y crear nuevos administradores.

----------------Usuarios Dirigidos:

Estudiantes: Potenciales estudiantes de la institución.
Administradores: Encargados de gestionar los cursos, matriculas y usuarios.
##################################################################################################################
Tecnologías Utilizadas
Frontend:
* React : npm create vite@latest nombre-del-proyecto --template react
* React Router DOM: npm install react-router-dom
* Material UI: npm install @mui/material @emotion/react @emotion/styled
* EmailJS: npm install @emailjs/browser
* AWS SDK (para almacenamiento de imágenes): npm install aws-sdk
* SweetAlert y Notyf (para notificaciones): 
npm install sweetalert2
npm install notyf
* PayPal (para pasarela de pagos): npm install @paypal/react-paypal-js
* File Reader
* Bootstrap: npm install bootstrap
* Swiper : npm install swiper
* XLSX : npm install xlsx


Backend:

# Django
django-admin startproject Backend
cd edunamica_backend
python manage.py startapp api

# Django REST Framework (API REST)
Instalar Django y dependencias : pip install django djangorestframework mysqlclient djangorestframework-simplejwt

# JWT (JSON Web Tokens) para autenticación

# Configuracion en el archivo settings.py:
INSTALLED_APPS = [
    # Otros apps...
    'rest_framework',
    'rest_framework_simplejwt',
]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

# En api/urls.py 
urlpatterns = [
    # Otras URLs...
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
# MySQL (base de datos) 
Asegurate de crear la base de datos: CREATE DATABASE database_edunamica;

Configuración: 
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'edunamica',  # Nombre de tu base de datos
        'USER': 'tu_usuario_mysql',
        'PASSWORD': 'tu_contraseña_mysql',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}


####################################################################################
Herramientas de Desarrollo:
# Vite (para la construcción y el desarrollo)
# **NPM**: Gestor de dependencias para el frontend.
# **Pip**: Gestor de dependencias para el backend.

######################################################################################
Pasos para Ejecutar el Proyecto
Instalar las dependencias:
# Frontend (React):
npm install
# Backend (Django):
pip install -r requirements.txt

# Configurar la base de datos: Asegúrate de tener MySQL configurado y creado con la estructura adecuada.

# Configurar las variables de entorno en el archivo .env.
# Variables de Entorno:
En el archivo .env asegurate de ajustar estas configuraciones: 
VITE_AWS_S3_BUCKET_NAME=tu-bucket-s3
VITE_AWS_ACCESS_KEY=tu-clave-acceso
VITE_AWS_SECRET_KEY=tu-clave-secreta
VITE_EMAILJS_USER_ID=tu-emailjs-user-id

# Ejecutar las migraciones en Django:
python manage.py makemigrations 
python manage.py migrate

# Ejecutar el servidor: python manage.py runserver
# En el FrontEnd: npm run dev

#####################################################################################
# Funcionalidades
Funcionalidades Administrativas:
-Crear, editar y eliminar cursos.
-Crear, editar y eliminar administradores.
-Crear, editar y eliminar matriculas.
-Crear y gestionar categorías de cursos.
-Crear y gestionar alianzas con otras instituciones.
-Añadir nuevos estudiantes mediante el formulario de prematricula.

Funcionalidades Públicas (Estudiantes):
-Visualizar cursos disponibles.
-Realizar prematricula y pago de los cursos.

# Características Adicionales:
Notificaciones: Usamos SweetAlert y Notyf para mostrar alertas y notificaciones en diversas acciones.
Roles de Usuario:
Público General: Accede a la información general de los cursos.
Estudiantes: Realizan prematriculas y pagos, acceden al sistema tras ser aceptados.
Administradores: Gestionan los cursos, matriculas, y usuarios.
Interacción entre Frontend y Backend:
El frontend interactúa con el backend mediante una API REST.

# Estructura del Proyecto
-------------------Frontend (React):

/frontend
    /final_project_edunamica
        /src
            /components
            /img
            /services
            /styles
            /pages
            /routes
    App.jsx         # Componente principal
    main.jsx       


------------------Backend (Django):
/Backend
    /api
        /models
        /migrations
        /views
        /serializers
        /urls
  /settings.py      # Configuración del proyecto Django
  /urls.py          # Enrutamiento de Django
  /wsgi.py          # Configuración para desplegar en producción
  /manage.py        # Comando de gestión de Django

# Archivos de Configuración:
.env: Configura las variables de entorno para los servicios como AWS y EmailJS.
# Variables de Entorno:
En el archivo .env asegurate de ajustar estas configuraciones: 
VITE_AWS_S3_BUCKET_NAME=tu-bucket-s3
VITE_AWS_ACCESS_KEY=tu-clave-acceso
VITE_AWS_SECRET_KEY=tu-clave-secreta
VITE_EMAILJS_USER_ID=tu-emailjs-user-id


# Pruebas en Postman
El proyecto no incluye pruebas unitarias o de integración configuradas, pero puedes probar los endpoints del backend utilizando Postman. 
Ejemplos
Partners:
Cursos:
GET api/courses/ - Listar cursos
POST api/courses/ - Crear curso

Puedes acceder a la colección de Postman para interactuar con la API a través del siguiente enlace:  
[Ver la colección de Postman](https://www.postman.com/mirthalopez/proyecto-edunamica/collection/lzub17v/proyecto-edunamica)

# Para hacer las pruebas:
- Importa las colecciones de Postman proporcionadas.
- Asegúrate de tener el backend corriendo en el puerto adecuado.
- Usa los métodos HTTP correctos (GET, POST, PUT, DELETE).
- Utiliza JWT para autenticarte en los endpoints protegidos.


# #######################################################

# Despliegue
- Backend: Asegúrate de configurar la conexión con MySQL en el entorno de producción. También necesitarás configurar el almacenamiento (por ejemplo, en Amazon S3 si usas AWS).

- Frontend: En este momento no se ha definido un dominio para el frontend. Está en etapa de desarrollo y no se requiere configuración adicional para el despliegue.

Licencia y Contacto
Licencia: (Si tienes alguna licencia, por ejemplo, MIT, Apache, etc.)

Contacto:
Correo electrónico: melopez@fwdcostarica.com
Correo electrónico: aarguedas@fwdcostarica.com

# Otros Detalles
Estado del Proyecto: El proyecto está en desarrollo.
Capturas de Pantalla o GIF: No disponibles por el momento.
Limitaciones o Advertencias: Ninguna conocida hasta ahora.