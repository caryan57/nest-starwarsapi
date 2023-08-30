import { IsString, MinLength, IsInt, IsPositive, Min } from "class-validator";

//El dto es lo que necesita enviar el usuario en el formulario para crear esta entidad.
export class CreatePersonDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  no: number
}
