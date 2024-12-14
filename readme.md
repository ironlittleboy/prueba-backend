README - Sports Betting Application

Backend

Requisitos previos

Node.js (versión 14 o superior)

MongoDB (instalado y en ejecución)

Instalación

Clonar el repositorio:

git clone <URL_REPOSITORIO>
cd backend

Instalar dependencias:

npm install

Configurar variables de entorno:
Crear un archivo .env en el directorio raíz del backend y definir las siguientes variables:

PORT=3005
MONGO_URI=mongodb://localhost:27017/prueba_reservacion
JWT_SECRET=mi_secreto_super_seguro

Iniciar el servidor:

npm run dev

Probar la API:
Accede a http://localhost:3005/v1/api para comprobar que el backend está funcionando correctamente