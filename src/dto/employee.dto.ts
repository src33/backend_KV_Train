import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./address.dto";
import "reflect-metadata";
import { Role } from "../utils/role.enum";
import { CreateDepartmentDto } from "./department.dto";
export class CreateEmployeeDto {
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
   @IsString()
   password: string;

   @IsNotEmpty()
   @ValidateNested({ each: true })
   @Type(() => CreateDepartmentDto)
   department: CreateDepartmentDto;

   @IsNotEmpty()
   @IsEnum(Role)
   role: Role;
}
