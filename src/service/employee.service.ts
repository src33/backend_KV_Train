import { CreateAddressDto } from "../dto/address.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import EmployeeRepository from "../repository/employee.repository";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

class EmployeeService {
   constructor(private employeeRepository: EmployeeRepository) {
      // this.employeeRepository = new EmployeeRepository();
   }
   login = async (email: string, password: string) => {
      const employee = await this.employeeRepository.findOneBy({ email });
      if (!employee) {
         throw new HttpException(404, "Employee Not found");
      } else {
         const result = await bcrypt.compare(password, employee.password);
         if (!result) throw new HttpException(401, "Invalid Login Credentials");
         else {
            const payload: jwtPayload = {
               name: employee.name,
               email: employee.email,
               role: employee.role,
            };
            const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: JWT_VALIDITY });
            return token;
         }
      }
   };
   getAllEmployees = async () => {
      return this.employeeRepository.find();
   };
   getEmployeeById = async (id: number) => {
      return this.employeeRepository.findOneBy({ id });
   };
   createEmployee = async (
      email: string,
      name: string,
      age: number,
      address: CreateAddressDto,
      password: string,
      role: Role
   ) => {
      const new_employee = new Employee();
      new_employee.email = email;
      new_employee.name = name;
      new_employee.age = age;
      new_employee.password = password ? await bcrypt.hash(password, 10) : "";
      new_employee.role = role;

      const new_employee_address = new Address();
      new_employee_address.line1 = address.line1;
      new_employee_address.pincode = address.pincode;

      new_employee.address = new_employee_address;
      return this.employeeRepository.save(new_employee);
   };
   updateEmployee = async (
      id: number,
      email: string,
      name: string,
      age: number,
      address: CreateAddressDto,
      password: string,
      role: Role
   ) => {
      const employee = await this.employeeRepository.findOneBy({ id: id });
      employee.email = email;
      employee.name = name;
      employee.age = age;
      employee.password = password;
      employee.role = role;

      // const employee_address = new Address();
      employee.address.line1 = address.line1;
      employee.address.pincode = address.pincode;

      // employee.address = employee_address;
      return this.employeeRepository.save(employee);
   };
   deleteEmployee = async (id: number) => {
      return this.employeeRepository.delete(id);
   };
   softRemove = async (delete_employee: Employee) => {
      // const delete_employee = await this.employeeRepository.findOneBy({ id: id });
      return this.employeeRepository.softRemove(delete_employee);
   };
}

export default EmployeeService;
