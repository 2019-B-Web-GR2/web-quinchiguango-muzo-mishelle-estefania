
import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuario_web')

export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        type:'int',
        unsigned: true,
        name: 'identificador',
        comment: 'Identificador de la tabla usuario'
    })
    id:number;
}
