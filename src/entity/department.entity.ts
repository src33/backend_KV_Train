import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Employee from "./employee.entity";

@Entity()
class Department extends AbstractEntity {
   @Column()
   name: string;

   @OneToMany(() => Employee, (employee) => employee.department, {})
   employee: Employee;
}
export default Department;
