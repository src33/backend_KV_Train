import { getRepository } from "typeorm";
import dataSource from "../../src/db/data-source.db";
import EmployeeRepository from "../../src/repository/employee.repository";
import Employee from "../../src/entity/employee.entity";
import EmployeeService from "../../src/service/employee.service";
import { when } from "jest-when";
import { Role } from "../../src/utils/role.enum";
import Department from "../../src/entity/department.entity";
import Address from "../../src/entity/address.entity";
import bcrypt from "bcrypt";

describe("Employee Service", () => {
   let employeeRepository: EmployeeRepository;
   let employeeService: EmployeeService;

   let sampleEmployee = new Employee();
   sampleEmployee.id = 7;
   sampleEmployee.name = "name";
   sampleEmployee.age = 78;
   sampleEmployee.email = "sample@gamil.com";
   sampleEmployee.password = "encryptpassword";

   let sampleAddress = new Address();
   sampleAddress.line1 = "addressline";
   sampleAddress.pincode = 673003;
   sampleEmployee.address = sampleAddress;

   sampleEmployee.role = Role.UI;

   beforeAll(() => {
      const dataSource = {
         getRepository: jest.fn(),
      };
      employeeRepository = new EmployeeRepository(
         dataSource.getRepository(Employee)
      ) as jest.Mocked<EmployeeRepository>;
      employeeService = new EmployeeService(employeeRepository);
   });
   afterAll(() => {
      jest.clearAllMocks();
   });
   it("should return all employees", async () => {
      const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
      employeeRepository.find = mock;

      const users = await employeeService.getAllEmployees();

      expect(users).toEqual([]);
      expect(mock).toHaveBeenCalledTimes(1);
   });
   it("should return one employee by id", async () => {
      const mock = jest.fn();
      when(mock)
         .calledWith({ id: 3 })
         .mockResolvedValue({ id: 3, name: "sample" } as Employee);
      employeeRepository.findOneBy = mock;

      const users = await employeeService.getEmployeeById(3);

      expect(users.name).toEqual("sample");
      expect(mock).toHaveBeenCalledTimes(1);
   });
   it("should return the deleted employee", async () => {
      const mock = jest.fn();
      when(mock).calledWith({ id: 7 }).mockResolvedValue(undefined);
      employeeRepository.softRemove = mock;

      const users = await employeeService.softRemove(sampleEmployee);

      expect(users).toEqual(undefined);
      expect(mock).toHaveBeenCalledTimes(1);
   });

   it("it should log in authorized employee", async () => {
      const mockFind = jest.fn();
      when(mockFind).calledWith({ email: "sample@gamil.com" }).mockResolvedValue(sampleEmployee);
      employeeRepository.findOneBy = mockFind;

      const users = await employeeService.login("sample@gamil.com", "password");

      const mockBcrypt = jest.fn();
      when(mockBcrypt).calledWith("password", "encryptpassword").mockResolvedValue(true);
      bcrypt.compare = mockBcrypt;

      const result = await bcrypt.compare("password", "encryptpassword");
      expect(users).toEqual(sampleEmployee);
      expect(mockFind).toHaveBeenCalledTimes(1);
      // expect(result).toEqual(true);
      
      expect(result).rejects.toThrow("Invalid Login Credentials");
      expect(mockBcrypt).toHaveBeenCalledTimes(1);
   });
});
