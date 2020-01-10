import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query, Req, Res,
    Session,
    UnauthorizedException
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {DeleteResult} from "typeorm";
import * as Joi from '@hapi/joi';
import {UsuarioCreateDto} from "./UsuarioCreateDto";
import {validate} from "class-validator";
import {UsuarioUpdateDto} from "./usuario.update-dto";
import {ok} from "assert";

@Controller('usuario')
export class UsuarioController {

    //Adm -> Crea, actualiza y elimina
    //Sup -> actualiza

    constructor(
        // tslint:disable-next-line:variable-name
        private readonly _usuarioService: UsuarioService,
    ) {
    }

    @Get('ejemplos')
    ejemplos(
        @Res() res,
    ){
        res.render('ejemplo',{
            datos:{
                nombre:'Mishelle',
            } ,
        });
    }


    @Get('sesion')
    sesion(
        @Session() session,
    ) {
        return session;
    }

    //desloguearse
    @Get('logout')
    logout(
        @Session() session,
        @Req() req,
    ){
        session.usuario=undefined;
        req.session.destroy();
        return 'Deslogueado';
    }

    /*@Get('hola')
    hola(): string {
        return `*/
    @Get('hola')
    hola(
        @Session() session,
    ): string {
        let contenidoHTML='';

        if(session.usuario){
            contenidoHTML='<ul>';
            session.usuario
                .roles
                .foreach(
                    (nombreRol)=>{
                        contenidoHTML=contenidoHTML + `<li>${nombreRol}</li>`;
},
    );
contenidoHTML +='</ul>';
    }
       return`
<html>
<head>
             <title>EPN</title>
</head>
<body>
<--! Condicion ? si : no -->
  <h1>Mi primera página web ${
            session.usuario ? session.usuario.nombre:''
       }</h1> 
  $ {contenidoHTML} 
  <!--<ul>
  //roles
        <li>Supervisor</li>
        <li>Administrador</li>
</ul>--> 
</body>
</html>`;
    }

    //Get /model/:id
    @Get(':id')
    obtenerUsuario(
        @Param('id') identificador: string,
    ): Promise<UsuarioEntity> {
        return this._usuarioService
            .encontrarUno(Number(identificador));
    }
    /*@Post()
crearUnUsuario( //nombre de la funcion
    @Body() usuario:UsuarioEntity
) : Promise<UsuarioEntity>{   //devuelve una promesa de usuarioEntity
    return this._usuarioService
        .crearUno
        (usuario   //mandamos el usuario
        );
}*/

    /*   @Post()
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
       }*/
    @Post()
    async crearUsuario(
        @Body() usuario: UsuarioEntity,
        @Session() session,
    ): Promise<UsuarioEntity> {
        const isAdm = session.usuario.roles.find(rol => {
            return rol === 'Administrador';
        });
        if (!isAdm) {
            throw new UnauthorizedException('Error', 'No cuenta con permisos para realizar la acción');
        }
        const usuarioCreateDTO = new UsuarioCreateDto();
        usuarioCreateDTO.nombre = usuario.nombre;
        usuarioCreateDTO.cedula = usuario.cedula;
        const errores = await validate(usuarioCreateDTO);
        if (errores.length > 0) {
            throw new BadRequestException('Error validando');
        } else {
            return this._usuarioService
                .crearUno(
                    usuario,
                );
        }
    }

    /*  @Put(':id')
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
        }}*/


    @Put()
    async actualizarUnUsuario(
        @Body() usuario: UsuarioEntity,
        @Param('id') id: string,
        @Session() session,
    ) {
        const isAdm = session.usuario.roles.find(rol => {
            return (rol === 'Administrador' || rol === 'Supervisor');
        });
        const usuarioUpdateDTO = new UsuarioUpdateDto();
        usuarioUpdateDTO.nombre = usuario.nombre;
        usuarioUpdateDTO.cedula = usuario.cedula;
        usuarioUpdateDTO.id = +id;
        const errores = await validate(usuarioUpdateDTO);
        if (errores.length > 0) {
            throw new BadRequestException('Error validando');
        } else {
            return this._usuarioService
                .actualizarUno(
                    +id,
                    usuario,
                );
        }
    }

    // @Delete(':id')
    // eliminarUno(
    //     @Param('id') id: string,
    // ): Promise<DeleteResult> {
    //     return this._usuarioService
    //         .borrarUno(
    //             +id
    //         );
    // }

    @Delete()
    eliminarUno(
        @Param('id') id: string,
        @Session() session,
    ): Promise<DeleteResult> {
        const isAdm = session.usuario.roles.find(rol => {
            return rol === 'Administrador';
        });
        if (!isAdm) {
            throw new UnauthorizedException('Error', 'No cuenta con permisos para realizar la acción');
        }
        return this._usuarioService
            .borrarUno(
                +id,
            );
    }

   /* @Get()
    async buscar(
        @Query('skip') skip?: string | number,
        @Query('take') take?: string | number,
        @Query('where') where?: string,
        @Query('order') order?: string,
    ): Promise<UsuarioEntity[]> {
        const nuevoEsquema = Joi.object({
            skip: Joi.number(),
        });
        try {
            const objetoValidado = await nuevoEsquema
                .validateAsync({
                    skip: skip,
                });
            console.log('objetoValidado', objetoValidado);
        } catch (err) {
            console.error('Error', err);
        }

        if (skip) {
            skip = +skip;
        }
        if (take) {
            take = +take;
        }
        if (where) {
            try {
                where = JSON.parse(where);
            } catch (e) {
                where = undefined;
            }
        }
        if (order) {
            try {
                order = JSON.parse(order);
            } catch (e) {
                order = undefined;
            }
        }
        return this._usuarioService.buscar(
            where,
            skip as number,
            take as number,
            order,
        );
    }
*/
    @Post('login')
    login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Session() session,
    ) {
        console.log('Session', session);
        if (username === 'adrian' && password === '1234') {
            session.usuario = {
                nombre: 'Adrian',
                userId: 1,
                roles: ['Administrador'],
            };
            return 'ok';
        } else if (username === 'vicente' && password === '1234') {
            session.usuario = {
                nombre: 'Vicente',
                userId: 2,
                roles: ['Supervisor'],
            };
            return 'ok';
        }
        throw new BadRequestException('Error', 'Error autenticando');
    }
}
