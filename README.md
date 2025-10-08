# NOC Project

The goal is to create a series of tasks using Clean Architecture with TypeScript.

## dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno

```
PORT=3000
PROD=false
MAILER_EMAIL=
MAILER_SECRET_KEY=
```

3. Ejecutar el comando `npm install`
4. Levantar las bases de datos con el comando

```bash
docker-compose up -d
```

5. Ejecutar `npm run dev`

## Obtener Gmail Key

[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)
