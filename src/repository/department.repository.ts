import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
   constructor(private departmentRepository: Repository<Department>) {
      // this.dataSource = dataSource;
   }
   find = async (): Promise<Department[]> => {
      return this.departmentRepository.find();
   };
   findOneBy = async (filter: Partial<Department>): Promise<Department | null> => {
      return this.departmentRepository.findOne({
         where: filter,
      });
   };
   findEmployeesBy = async (filter: Partial<Department>): Promise<Department | null> => {
      return this.departmentRepository.findOne({
         where: filter,
         relations: ["employee"],
      });
   };
   save = async (department: Department): Promise<Department> => {
      return this.departmentRepository.save(department);
   };
   delete = async (id: number): Promise<void> => {
      await this.departmentRepository.softDelete(id);
   };
   softRemove = async (delete_department: Department): Promise<void> => {
      console.log("------repoooo---");
      await this.departmentRepository.softRemove(delete_department);
   };
}
export default DepartmentRepository;
