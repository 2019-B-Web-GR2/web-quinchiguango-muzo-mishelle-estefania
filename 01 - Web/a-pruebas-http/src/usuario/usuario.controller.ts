import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Session} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {DeleteResult} from "typeorm";
import * as Joi from '@hapi/joi';
import {UsuarioCreateDto} from "./usuario.create-dto";
import {validate} from "class-validator";
import {UsuarioUpdateDto} from "./usuario.update-dto";

// JS const Joi = require('@hapi/joi');


@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly _usuarioService: UsuarioService,
    ) {

    }


    // GET /modelo/:id
    @Get(':id')
    obtenerUnUsuario(
        @Param('id') identificador: string,
    ): Promise<UsuarioEntity | undefined> {
        return this._usuarioService
            .encontrarUno(
                Number(identificador)
            );
    }

    @Post('login')
    login(
        @Body('username') username:string,
        @Body('password') password:string,
        @Session()session
    ){
        console.log('Sesion',session);
        if(username==='mishelle'&& password==='1234'){
            session.usuario={//ponemos una nueva propiedad
                nombre:'Mishelle',
                userID:1,
                roles:['Administrador'] //puede borrar  y actualizar
            }

            return 'ok';
        }
        if (username==='estefania'&& password==='1234'){
            session.usuario= {//ponemos una nueva propiedad
                nombre: 'Estefania',
                userID: 2,
                roles: ['Supervisor']
            }
            return 'ok';
    }
}
    @Post()
    async crearUnUsuario(
        @Body() usuario: UsuarioEntity,
    ): Promise<UsuarioEntity> {
        const usuarioCreateDTO = new UsuarioCreateDto();
        usuarioCreateDTO.nombre = usuario.nombre;
        usuarioCreateDTO.cedula = usuario.cedula;
        const errores = await validate(usuarioCreateDTO);
        if (errores.length > 0) {
            throw new BadRequestException('Error validando');
        } else {
            return this._usuarioService
                .crearUno(
                    usuario
                );
        }


    }

    @Put(':id')
    actualizarUnUsuario(
        @Body() usuario: UsuarioEntity,
        @Param('id') id: string,
    ): Promise<UsuarioEntity> {

        const usuarioUpdateDTO.nombre = new UsuarioUpdateDto();
        usuarioUpdateDTO.nombre=usuario.nombre;
        usuarioUpdateDTO.cedula= usuario.cedula;
        usuarioUpdateDTO.id= +id;
        const errores = await validate (usuarioUpdateDTO);

        if(errores.length>0){
            throw new BadRequestException('Error vlidando')
        }
            else{

        return this._usuarioService
            .actualizarUno(
                +id,
                usuario
            );
    }}

    @Delete(':id')
    eliminarUno(
        @Param('id') id: string,
    ): Promise<DeleteResult> {
        return this._usuarioService
            .borrarUno(
                +id
            );
    }

    @Get()
    async buscar(
        @Query('skip') skip?: string | number,
        @Query('take') take?: string | number,
        @Query('where') where?: string,
        @Query('order') order?: string,
    ): Promise<UsuarioEntity[]> {
        if (order) {
            try {
                order = JSON.parse(order);
            } catch (e) {
                order = undefined;
            }
        }
        if (where) {
            try {
                where = JSON.parse(where);
            } catch (e) {
                where = undefined;
            }
        }
        if (skip) {
            skip = +skip;
            // const nuevoEsquema = Joi.object({
            //     skip: Joi.number()
            // });
            // try {
            //     const objetoValidado = await nuevoEsquema
            //         .validateAsync({
            //             skip: skip
            //         });
            //     console.log('objetoValidado', objetoValidado);
            // } catch (error) {
            //     console.error('Error',error);
            // }
        }
        if (take) {
            take = +take;
        }
        return this._usuarioService
            .buscar(
                where,
                skip as number,
                take as number,
                order
            );
    }

    // @Get('hola')
    // hola(): string {
    //     return 'Hola';
    // }

    @Get('hola')
    hola(): string {
        return `
        <html>

<head> <title> EPN </title></head>
<body>
<h1> Mi primera pagina web</h1>
</body>
</html>`;
    }
}

