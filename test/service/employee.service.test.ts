import { getRepository } from "typeorm";
import dataSource from "../../src/db/data-source.db";
import EmployeeRepository from "../../src/repository/employee.repository";
import Employee from "../../src/entity/employee.entity";
import EmployeeService from "../../src/service/employee.service";
import { when } from "jest-when";

describe("Employee Service", () => {
   let employeeRepository: EmployeeRepository;
   let employeeService: EmployeeService;
   beforeAll(() => {
      const dataSource = {
         getRepository: jest.fn(),
      };
      employeeRepository = new EmployeeRepository(
         dataSource.getRepository(Employee)
      ) as jest.Mocked<EmployeeRepository>;
      employeeService = new EmployeeService(employeeRepository);
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
         .calledWith({id:3})
         .mockResolvedValue({ id: 3, name: "sample" } as Employee);
      employeeRepository.findOneBy = mock;

      const users = await employeeService.getEmployeeById(3);

      expect(users.name).toEqual("sample");
      expect(mock).toHaveBeenCalledTimes(1);
   });
});
