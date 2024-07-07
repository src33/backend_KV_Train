import { plainToClass, plainToInstance } from "class-transformer";
import HttpException from "../exceptions/http.exceptions";
import EmployeeService from "../service/employee.service";
import express from "express";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import { error } from "console";
import { RequestWithUser } from "../utils/requestWithUser";
import authorize from "../middleware/authorize.middleware";

class EmployeeController {
   public router: express.Router;

   constructor(private employeeService: EmployeeService) {
      this.router = express.Router();
      this.router.post("/login", this.login);
      this.router.get("/", this.getAllEmployees);
      this.router.get("/:id", this.getEmployeeById);
      this.router.post("/", authorize, this.createEmployee);
      this.router.put("/:id", this.updateEmployee);
      this.router.delete("/:id", this.deleteEmployee);
   }
   public login = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      try {
         const token = await this.employeeService.login(req.body.email, req.body.password);
         res.status(200).send(token);
      } catch (err) {
         next(err);
      }
   };
   public getAllEmployees = async (req: RequestWithUser, res: express.Response) => {
      const employees = await this.employeeService.getAllEmployees();
      res.status(200).send(employees);
   };
   public getEmployeeById = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      try {
         const employee_id = req.params.id;
         if (!Number(employee_id)) {
            const error = new HttpException(404, "Invalid Request");
            throw error;
         } else {
            const employeeWithId = await this.employeeService.getEmployeeById(Number(employee_id));
            if (!employeeWithId) {
               const error = new HttpException(404, "No employee with id : " + employee_id);
               throw error;
            } else {
               res.status(200).send(employeeWithId);
            }
         }
      } catch (err) {
         next(err);
      }
   };
   private createEmployee = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      //----------email validation---------
      try {
         if (req.role != "HR") {
            console.log("if");
            throw new HttpException(403, "Not Authorized");
         } else {
            const employee_dto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(employee_dto);

            if (errors.length) {
               console.log(JSON.stringify(errors));
               throw new HttpException(400, JSON.stringify(errors));
            }
            const new_employee = await this.employeeService.createEmployee(
               employee_dto.email,
               employee_dto.name,
               employee_dto.age,
               employee_dto.address,
               employee_dto.password,
               employee_dto.role
            );
            res.status(201).send(new_employee);
         }
      } catch (err) {
         next(err);
      }
   };
   private updateEmployee = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      try {
         const employee_id = req.params.id;
         if (!Number(employee_id)) {
            const error = new HttpException(404, "Invalid Request");
            throw error;
         } else {
            const employee_dto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(employee_dto);

            if (errors.length) {
               console.log(errors);
               throw new HttpException(400, JSON.stringify(errors[1]));
            }
            const updated_employee = await this.employeeService.updateEmployee(
               Number(employee_id),
               employee_dto.email,
               employee_dto.name,
               employee_dto.age,
               employee_dto.address,
               employee_dto.password,
               employee_dto.role
            );
            res.status(201).send(updated_employee);
         }
      } catch (err) {
         next(err);
      }
   };
   private deleteEmployee = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      try {
         const employee_id = req.params.id;
         if (!Number(employee_id)) {
            const error = new HttpException(404, "Invalid Request");
            throw error;
         } else {
            const employeeWithId = await this.employeeService.getEmployeeById(Number(employee_id));
            if (!employeeWithId) {
               // console.log("entered IF");
               const error = new HttpException(404, "Employee Not Found");
               throw error;
            } else {
               await this.employeeService.softRemove(employeeWithId);
               res.status(200).send(employeeWithId);
            }
         }
      } catch (err) {
         next(err);
      }
   };
}
export default EmployeeController;
// try {
//   const employee_dto = plainToInstance(CreateEmployeeDto, req.body);
//   const errors = await validate(employee_dto);

//   if (errors.length) {
//     // Transform errors into the desired format
//     const formattedErrors = {
//       error: "Validation Failed",
//       statusCode: 400,
//       errors: []
//     };

//     errors.forEach(error => {
//       if (error.constraints && error.constraints.isNumber) {
//         // Use the constraint message if available
//         formattedErrors.errors.push(error.constraints.isNumber);
//       } else {
//         // Fallback to a generic message if no specific constraint message found
//         formattedErrors.errors.push(`Validation error for ${error.property}`);
//       }
//     });

//     // Throw the formatted error as an HttpException
//     throw new HttpException(400, JSON.stringify(formattedErrors));
//   }

//   // Proceed with normal flow if no errors
// } catch (error) {
//   // Handle or propagate the error as needed
// }
