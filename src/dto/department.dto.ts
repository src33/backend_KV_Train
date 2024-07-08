import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import "reflect-metadata";
import { DepartmentList } from "../utils/department.enum";
export class CreateDepartmentDto {
   @IsNotEmpty()
   @IsEnum(DepartmentList)
   name: DepartmentList;
}
