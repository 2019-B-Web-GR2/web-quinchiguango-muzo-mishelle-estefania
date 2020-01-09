import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {DeleteResult, Like, MoreThan, Repository} from "typeorm";

@Injectable()
export class UsuarioService {
    constructor(
        //decorador
        @InjectRepository(UsuarioEntity) // Inyectar Dependencias recibe una entidad
        //variable
        private _repositorioUsuario: Repository<UsuarioEntity>
    ) {
    }

    //metodo
    encontrarUno(id: number): Promise<UsuarioEntity | undefined> { //devuelve una promesa de usuario o undefine
        return this._repositorioUsuario
            .findOne(id);
    }

    //metodo async
    /*async encontrarUno1(id: number){
        console.log('Empezo');
        const usuario = await this._repositorioUsuario
            .findOne(id);
        console.log('termino');
        return usuario;
    }*/

    crearUno(usuario: UsuarioEntity) {
        return this._repositorioUsuario
            .save<UsuarioEntity>(usuario);
    }

    borrarUno(id: number): Promise<DeleteResult> {
        return this._repositorioUsuario
            .delete(id);
    }

    actualizarUno(
        id: number,
        usuario: UsuarioEntity
    ): Promise<UsuarioEntity> {
        usuario.id = id;
        return this._repositorioUsuario
            .save(usuario); // UPSERT
    }

    buscar(
        where:any={},
        skip: number=0, //para mandar los 10 primeros.
        take: number=10
    ){
        this._repositorioUsuario
            .find({
               // where:{
               //     cedula:'1723902472'  //mandamos lo q quiero buscar
               // }

                /*where:[
                    {
                        nombre:'Mishelle'
                    },
                    {
                        nombre:'Estefania'
                    }
                ],*/

                where:where,
                skip:0,
                take:10
            })
    }

}
