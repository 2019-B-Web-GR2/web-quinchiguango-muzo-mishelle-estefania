
import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuario_web')

export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        type:'int',
        unsigned: true,
        name: 'identificador',
        comment: 'Identificador de la tabla usuario'
    })
    id:number;

    @Index ({
        unique:false,
    })
    @Column({
        type:'varchar', //tipo
        nullable:true, //para q no este nulo
        name: 'nombre',  //nombre en la base
        comment: 'nombre de la tabla usuario' //comentario
    })
    nombre?:string;

//CEDULA

    @Index ({
        unique:false,
    })
    @Column({
        type:'varchar', //tipo
        nullable:false, //para q no este nulo
        name: 'cedula',  //nombre en la base
        comment: 'cedula de la tabla usuario' //comentario
    })
    cedula:string;

}
