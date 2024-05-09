# Desafío: Reestructura de nuestro servidor

## Nota

No esta actualizado el dao de fs!

## Instalación

- Paso 1: clonar repositorio e instalar paquetes.

```
git clone https://github.com/jp-quintana/tutoria-backend-50005.git ./

npm i

```

- Paso 2: Setear el MongoDB Cluster.

- Paso 3: Crear un archivo .env con nuestras variables de entorno en la raiz del directorio.

```
MONGO_URI=mongodb+srv://****:****@****
PORT=8080
DAO_OPTION=mongoose
EXPRESS_SECRET=****
GITHUB_CLIENT_SECRET=****
GITHUB_CLIENT_ID=****
```

- Paso 4: Levantar el servidor.

```
npm run dev
```
