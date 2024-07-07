import { DataSource, Repository, UpdateResult } from "typeorm";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
   constructor(private employeeRepository: Repository<Employee>) {
      // this.dataSource = dataSource;
   }
   find = async (): Promise<Employee[]> => {
      return this.employeeRepository.find({ relations: ["address"] });
   };
   findOneBy = async (filter: Partial<Employee>): Promise<Employee | null> => {
      return this.employeeRepository.findOne({
         where: filter,
         relations: ["address"],
      });
   };
   save = async (employee: Employee): Promise<Employee> => {
      return this.employeeRepository.save(employee);
   };
   delete = async (id: number): Promise<void> => {
      await this.employeeRepository.softDelete(id);
   };
   softRemove = async (delete_employee: Employee): Promise<void> => {
      await this.employeeRepository.softRemove(delete_employee);
   };
}

export default EmployeeRepository;
