import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Session} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";



@Controller('usuario')
export class UsuarioController {
    constructor(  //inyectar la dependecia
        private readonly _usuarioService: UsuarioService
    ){
    }

    @Get('id')
    obtenerUnusuario( //nombre de la funcion
        @Param('id') identificador:string,
    ) :Promise<UsuarioEntity | undefined>{
        return this._usuarioService.encontrarUno(Number(identificador));
    }
}


