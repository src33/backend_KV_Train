import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import "reflect-metadata";
export class CreateDepartmentDto {
   @IsNotEmpty()
   @IsNumber()
   id: number;

   //    @IsNotEmpty()
   //    @IsString()
   //    name: string;
}
