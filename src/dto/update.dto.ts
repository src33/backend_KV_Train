import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./address.dto";
import "reflect-metadata";
import { Role } from "../utils/role.enum";
export class UpdateEmployeeDto {
   @IsNotEmpty()
   @IsString()
   name: string;

   @IsEmail()
   @IsNotEmpty()
   @IsString()
   email: string;

   @IsNotEmpty()
   @IsNumber()
   age: number;

   @IsNotEmpty()
   @ValidateNested({ each: true })
   @Type(() => CreateAddressDto)
   address: CreateAddressDto;

   @IsNotEmpty()
   @IsEnum(Role)
   role: Role;

   @IsNotEmpty()
   @IsNumber()
   department_id: number;
}
