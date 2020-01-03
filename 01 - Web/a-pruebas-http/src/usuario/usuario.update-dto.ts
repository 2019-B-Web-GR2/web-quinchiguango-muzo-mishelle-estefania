export class UsuarioUpdateDto{
    nombre: String

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    nombre: String
    @IsEmpty()
    cedula. string;
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    id: number

}
