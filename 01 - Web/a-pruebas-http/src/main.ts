// @ts-ignore
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import *as session from 'express-session';

const FileStore = require('session-filestore')(session);



async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
    app.set('view engine', 'ejs');
  //realizamos algunas configuraciones
  app.use(
      session({
        name:'server-session-id',
        secret: 'No sera de tomar un traguito',
        resave: true,
        saveUninitialized: true,
        cookie:{secure: false},
        store: new FileStore(),
      })
  )

  await app.listen(4000);
}
bootstrap();
