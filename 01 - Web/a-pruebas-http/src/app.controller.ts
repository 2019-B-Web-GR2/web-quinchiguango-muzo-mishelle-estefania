import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()   //recibe el segmento de la Url 
export class AppController {
  constructor(private appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();  
  }
}

//Typescript
// var nombre: string = "Nika"; Nunca se utiliza
let apellido:string = "Olmedo"; // Mutable
const cedula:string = "1720572773"; // Inmutable
apellido = "Velez"; // REASIGNAR "=" Mutable
//cedula = "18"; // :( INMUTABLE -NO REASIGNAR

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


Class Usuario2{
Constructor(
Public nombre:string, //parámetro requerido
Public apellido?:string,//parámetro opcional
) {}
}
Const adrian = new Usuario2(nombre: “Mishelle”);
Const vicente = new Usuario2(nombre: “Estefania” , apellido: “Quinchiguango”);


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
const pikachu:Pokemon ={
  id:1,
  nombre:'Pikachu',
  entrenador: ash,
};






