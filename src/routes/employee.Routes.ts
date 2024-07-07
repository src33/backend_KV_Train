import { DataSource } from "typeorm";
import EmployeeController from "../controller/employee.controller";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";
import Employee from "../entity/employee.entity";
import dataSource from "../db/data-source.db";

const employeeController = new EmployeeController(
  new EmployeeService(
    new EmployeeRepository(dataSource.getRepository(Employee))
  )
);
const employeeRouter = employeeController.router;

export default employeeRouter;
