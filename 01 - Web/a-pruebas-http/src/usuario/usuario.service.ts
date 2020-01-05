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
    encontrarUno(id: number): Promise<UsuarioEntity | undefined> {
        return this._repositorioUsuario
            .findOne(id);
    }

    crearUno(usuario: UsuarioEntity) {
        return this._repositorioUsuario
            .save(usuario);
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

        }
