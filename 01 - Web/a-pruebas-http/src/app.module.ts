import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioEntity} from "./usuario/usuario.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioService} from "./usuario/usuario.service";

@Module({
  imports: [

      UsuarioModule,
    TypeOrmModule.forRoot({
      name: 'default',  //nombre cadena de conex
      type: 'mysql',
      host: 'localhost',
      port: 32779,
      username: 'mishelle',
      password: '1234',
      database: 'web',
      dropSchema: true,
      entities: [
          UsuarioEntity
      ],
      synchronize: true, // Crear --> true, Conectar -->false
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(
      private _usuarioService:UsuarioService,// ponemos _ xq es privado
  ){

  }
}
