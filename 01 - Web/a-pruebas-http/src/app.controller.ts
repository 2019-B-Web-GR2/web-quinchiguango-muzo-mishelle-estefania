import {Body, Controller, Get, HttpCode, Param, Post, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()   //recibe el segmento de la Url 
export class AppController {
  constructor(private appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();  
  }


  //private obtenerSegundos() : number{}





  //query params

  @Get('bienvenida')
  public bienvenida(
      @Query () parametrosDeConsulta:any,
      @Query('nombre') nombreUsuario: string,
      @Query('numero') numeroUsuario: string,
      @Query('casado') casadoUsuario: string,
  ):string {

    console.log(parametrosDeConsulta);

    return `Mensaje ${parametrosDeConsulta.nombre} Numero  ${parametrosDeConsulta.numero}`;

  }

  //Params parmas
  @Get('incripciones-curso /:idcurso/:cedula')    //   /:nombreParametro
  public incripcionCurso (
      @Param () parametrosDeRuta
  ):string {

    console.log(parametrosDeRuta);

    return `Te inscribiste al curso: ${parametrosDeRuta.idCurso}  ${parametrosDeRuta.cedula}`;

  }

  //Body parmas
  @Post ('almorzar')
  @HttpCode(200)
  public almorzar (
      @Body () parametrosDeCuerpo

  ):string {

    console.log(parametrosDeCuerpo);

    return `Te inscribiste al curso: ${parametrosDeCuerpo}`;

  }

  //obtener cabeceras
/*
  @Get ('obtener-cabeceras')
  obtenerCabeceras(
      @Headers() cabeceras
  ){
    console.log(cabeceras);
    return`Las cabeceras son: ${cabeceras}`;
  }*/
}

interface ObjetoBienvenida{
  nombre?:string;
  numero?:string;
  casado?:string;
}

interface ObjetoInscripcion{
  idCurso: string;
  cedula: string;
}





//Typescript
// var nombre: string = "Nika"; Nunca se utiliza
let apellido:string = "Quinchiguango"; // Mutable
const cedula:string = "1720572773"; // Inmutable
apellido = "Muzo"; // REASIGNAR "=" Mutable
//cedula = "1723902472"; // :( INMUTABLE -NO REASIGNAR

// Variables Primitivas
const casado:boolean = false; //boolean
const edad : number = 30; // number
const hijos = null; //null
let ojos; // undefined

// Trusty - Falsy
if (0){ // === Compara el tipo de dato
  console.log('Truty');
}else{
  console.log('Falsy'); //Falsy cero es falso
}
if (1){
  console.log('Truty'); // Truty
}else{
  console.log('Falsy');
}
if (-1){
  console.log('Truty'); // Truty
}else{
  console.log('Falsy');
}
if (""){
  console.log('Truty');
}else{
  console.log('Falsy');// Falsy
}

if ([]){
  console.log('Truty');// Truty
}else{
  console.log('Falsy');
}

if ([1,2,3]){
  console.log('Truty');// Truty
}else{
  console.log('Falsy');
}

if ({}){
  console.log('Truty');// Truty
}else{
  console.log('Falsy');
}


class Usuario{
  public cedula:string ="1720572773";
  cedula2 = "1712435039"; // public : string

  private holaMundo(): void {
    console.log("Hola")
  }
}


/*Class Usuario2{
Constructor(
Public nombre:string, //parámetro requerido
Public apellido?:string,//parámetro opcional
) {}
}
Const adrian = new Usuario2(nombre: “Mishelle”);
Const vicente = new Usuario2(nombre: “Estefania” , apellido: “Quinchiguango”);
*/

interface Entrenador {
id: number;
nombre: string;
}

interface pokemos{
id: number;
  nombre: string;
  entrenador: Entrenador; //foreign key
}

const ash: Entrenador ={
   id:1,
   nombre: 'Ash',
};
/*const pikachu:Pokemon ={
  id:1,
  nombre:'Pikachu',
  entrenador: ash,
};*/






