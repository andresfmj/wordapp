# Word-App
> Esta sencilla aplicacion consiste en analizar cadenas de texto y separar caracteres de acuerdo a ciertos criterios y guardarlos en una pequeña base de datos

A través del [siguiente enlace](http://wd.ferudinato.com/) puedes ver una demo desplegada.

## Instalación y uso
Es necesario instalar las dependencias del proyecto definidas en el archivo `package.json`, para esto, basta con ejecutar la siguiente instrucción:
```bash
$ npm install
```

Antes de ejecutar el cliente, es necesario modificar la siguiente linea en el archivo de `functions.js`:
```js
const API  =  'http://wd.ferudinato.com:3010';
```
Reemplaza `wd.ferudinato.com` por `localhost`.
Una vez instaladas las dependencias, necesitas ejecutar el servidor de la siguiente manera:
```bash
$ npm run dev:serve
```

## API
Para ejecutar el servidor de la API, ejecuta la siguiente instruccion:
```bash
$ npm run server
```

## Diagrama de flujo
El siguiente diagrama de flujo se puede observar en [este enlace](https://drive.google.com/file/d/1QBm-WxWe9WFo9OKtnkXbENeEYuKxpQsD/view), y pretende mostrar el proceso detallado de la aplicacion.

