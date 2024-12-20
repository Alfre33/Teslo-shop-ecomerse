# Descripción

Este es un proyecto de un ecomerse con nextjs el cual esta basada en la tienda de tesla

# Correr en desarrollo

1. Clonar el repositorio
2. Crear una copia del archivo ``` .env.template``` y renomrarlo a solo ``` .env``` y agregar las variables de entrono 
3. Instalar dependencias ``` npm install```
4. Levantar la base de datos ``` docker compose up -d```
5. Correr migraciones de prisma ``` npx prisma migrate dev --name init ```
6. Ejecutar el seed ``` npm run seed```
7. Correr en desarrollo ``` npm run dev```

# Correr en producción 
