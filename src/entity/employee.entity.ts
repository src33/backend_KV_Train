import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity {
   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   age: number;

   @OneToOne(() => Address, (address) => address.employee, {
      cascade: true,
      onDelete: "CASCADE",
   })
   address: Address;

   @Column({ nullable: true })
   password: string;

   @ManyToOne(() => Department, (Department) => Department.employee, {})
   department: Department;

   @Column({ nullable: true })
   role: Role;
}
export default Employee;
