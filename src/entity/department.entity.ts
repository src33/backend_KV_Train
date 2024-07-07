import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract-entity";
import { Role } from "../utils/role.enum";
import Employee from "./employee.entity";

@Entity()
class Department extends AbstractEntity {
   @Column()
   name: string;

   @OneToMany(() => Employee, (employee) => employee.department, {
      cascade: true,
      onDelete: "CASCADE",
   })
   employee: Employee;
}
export default Department;
