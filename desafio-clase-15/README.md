# Desafío complementario: Práctica de integración sobre tu ecommerce

## Instalación

- Paso 1: clonar repositorio e instalar paquetes.

```
git clone -b desafio-clase-15 https://github.com/jp-quintana/tutoria-backend-50005.git

// ir al directorio creado

npm i

npm run setup

```

- Paso 2: Setear el MongoDB Cluster.

- Paso 3: Crear un archivo .env con nuestras variables de entorno en la raiz del directorio.

```
MONGO_URI=mongodb+srv://****:****@****
PORT=8080
DAO_OPTION=mongoose
```

- Paso 4: Levantar el servidor.

```
npm run dev
```

## Variables de entorno (.env)
Las variables de entorno son valores dinamicos que afectan como corre nuestro programa sin tener que tocar el código fuente. Se utilizan para configurar el entorno en el que se ejecuta una aplicación yon especialmente útiles para almacenar información sensible o configuraciones específicas del entorno. En nuestro caso, si se cambia DAO_OPTION=mongoose por DAO_OPTION=fs, el programa va a usar file system para guardar la info y no mongoose. Lo mismo, si se cambia el valor de PORT por algo distinto, también va a cambiar el puerto que se usa para levantar el servidor. También lo usamos para guardar el uri de mongo, que es información sensible, ya que no queremos que cualquier persona tenga acceso a nuestra db. Para poder usar esto en Node hay que instalar el paquete dotenv e importarlo en la primer linea de src/index.js. Este proyecto ya lo tiene instalado!

![env demo](https://github.com/jp-quintana/tutoria-backend-50005/assets/87621233/8d570f12-1a9c-48c9-8547-65e5f5013791)

