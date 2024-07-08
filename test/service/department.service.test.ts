import { when } from "jest-when";
import Department from "../../src/entity/department.entity";
import DepartmentRepository from "../../src/repository/department.repository";
import DepartmentService from "../../src/service/department.service";

describe("Department Service", () => {
   let departmentRepository: DepartmentRepository;
   let departmentService: DepartmentService;

   let sampleDepartment = new Department();
   sampleDepartment.id = 7;
   sampleDepartment.name = "name";

   beforeAll(() => {
      const dataSource = {
         getRepository: jest.fn(),
      };
      departmentRepository = new DepartmentRepository(
         dataSource.getRepository(Department)
      ) as jest.Mocked<DepartmentRepository>;
      departmentService = new DepartmentService(departmentRepository);
   });
   afterAll(() => {
      jest.clearAllMocks();
   });

   it("should get all departments", async () => {
      const mock = jest.fn();
      when(mock).mockResolvedValue([sampleDepartment]);
      departmentRepository.find = mock;

      const departments = await departmentService.getAllDepartments();

      expect(departments).toEqual([sampleDepartment]);
      expect(mock).toHaveBeenCalledTimes(1);
   });
   it("should get department by id", async () => {
      const mock = jest.fn();
      when(mock).calledWith({ id: 7 }).mockResolvedValue(sampleDepartment);
      departmentRepository.findOneBy = mock;

      const departments = await departmentService.getDepartmentById(7);

      expect(departments).toEqual(sampleDepartment);
      expect(mock).toHaveBeenCalledTimes(1);
   });
   it("should get department by name", async () => {
      const mock = jest.fn();
      when(mock).calledWith({ name: "name" }).mockResolvedValue(sampleDepartment);
      departmentRepository.findOneBy = mock;
      const departments = await departmentService.getDepartmentByName("name");

      expect(departments).toEqual(sampleDepartment);
      expect(mock).toHaveBeenCalledTimes(1);
   });

   it("should get employess of department by id", async () => {
      const mock = jest.fn();
      when(mock).calledWith({ id: 7 }).mockResolvedValue(sampleDepartment);
      departmentRepository.findEmployeesBy = mock;

      const departments = await departmentService.getDepartmentEmployees(7);

      expect(departments).toEqual(sampleDepartment);
      expect(mock).toHaveBeenCalledTimes(1);
   });
   it("should get employess of department by name", async () => {
      const mock = jest.fn();
      when(mock).calledWith({ name: "name" }).mockResolvedValue(sampleDepartment);
      departmentRepository.findEmployeesBy = mock;
      const departments = await departmentService.getEmployeesByDepartment("name");

      expect(departments).toEqual(sampleDepartment);
      expect(mock).toHaveBeenCalledTimes(1);
   });
   it("should create a department", async () => {
      const mock = jest.fn();
      when(mock)
         .calledWith({ name: "name" } as Department)
         .mockResolvedValue(sampleDepartment);
      departmentRepository.save = mock;
      const departments = await departmentService.createDepartment("name");

      expect(departments).toEqual(sampleDepartment);
      expect(mock).toHaveBeenCalledTimes(1);
   });
   it("should update a department", async () => {
      const mockFind = jest.fn();
      when(mockFind).calledWith({ id: 7 }).mockResolvedValue(sampleDepartment);
      departmentRepository.findOneBy = mockFind;

      const mockSave = jest.fn();
      when(mockSave).calledWith(sampleDepartment).mockResolvedValue(sampleDepartment);
      departmentRepository.save = mockSave;
      const updated_department = await departmentService.updateDepartment(7, "name");

      expect(mockFind).toHaveReturnedWith(sampleDepartment);
      expect(updated_department).toEqual(sampleDepartment);
      expect(mockSave).toHaveBeenCalledTimes(1);
   });
   it("its should delete department and return deleted department", async () => {
      const mock = jest.fn();
      when(mock)
         .calledWith({ id: 7, name: "name" } as Department)
         .mockResolvedValue(undefined);
      departmentRepository.softRemove = mock;

      const deleted_department = await departmentService.softRemove(sampleDepartment);

      expect(deleted_department).toEqual(undefined);
      expect(mock).toHaveBeenCalledTimes(1);
   });
});
