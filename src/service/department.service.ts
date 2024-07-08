import { Repository } from "typeorm";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
   constructor(private departmentRepository: DepartmentRepository) {}
   getAllDepartments = async () => {
      return this.departmentRepository.find();
   };

   getDepartmentById = async (id: number) => {
      return this.departmentRepository.findOneBy({ id });
   };
   getDepartmentByName=async (name:string) => {
      return this.departmentRepository.findOneBy({ name });
   };
   getDepartmentEmployees = async (id: number) => {
      return this.departmentRepository.findEmployeesBy({ id });
   };

   getEmployeesByDepartment =async (name: string) => {
      return this.departmentRepository.findEmployeesBy({ name});
   };
   createDepartment = async (name: string) => {
      const new_department = new Department();
      new_department.name = name;
      return this.departmentRepository.save(new_department);
   };

   updateDepartment = async (id: number, name: string) => {
      const department = await this.departmentRepository.findOneBy({ id: id });
      department.name = name;
      return this.departmentRepository.save(department);
   };

   softRemove = async (delete_department: Department) => {
      // const delete_department = await this.departmentRepository.findOneBy({ id: id });
      console.log("----service");
      return this.departmentRepository.softRemove(delete_department);
   };
}
export default DepartmentService;