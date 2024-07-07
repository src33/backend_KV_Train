import express from "express";
import Department from "../entity/department.entity";
import DepartmentService from "../service/department.service";
import { Request, Response } from "express";
import authorize from "../middleware/authorize.middleware";
import HttpException from "../exceptions/http.exceptions";
import { isString } from "class-validator";
import { RequestWithUser } from "../utils/requestWithUser";

class DepartmentController {
   public router: express.Router;
   static router: any;

   constructor(private departmentService: DepartmentService) {
      this.router = express.Router();

      this.router.get("/", this.getAllDepartments);
      this.router.get("/:id", this.getDepartmentById);
      this.router.post("/", authorize, this.createDepartment);
      this.router.put("/:id", this.updateDepartment);
      this.router.delete("/:id", authorize, this.deleteDepartment);
   }

   public getAllDepartments = async (req: Request, res: Response) => {
      const departments = await this.departmentService.getAllDepartments();
      res.status(200).send(departments);
   };

   public getDepartmentById = async (req: Request, res: express.Response, next: express.NextFunction) => {
      try {
         //Error handling
         const department_id = req.params.id;
         if (!Number(department_id)) {
            //validation
            const error = new HttpException(404, "Invalid Request");
            throw error;
         } else {
            const departmentWithId = await this.departmentService.getDepartmentById(Number(department_id));
            if (!departmentWithId) {
               const error = new HttpException(404, "No department with id : " + department_id);
               throw error;
            } else {
               res.status(200).send(departmentWithId);
            }
         }
      } catch (err) {
         next(err);
      }
   };

   private createDepartment = async (req: RequestWithUser, res: Response, next: express.NextFunction) => {
      try {
         //Error handling
         if (req.role != "HR") {
            console.log("if");
            throw new HttpException(403, "Not Authorized");
         } else {
            const department = await this.departmentService.createDepartment(req.body.name);
            res.status(200).send(department);
         }
      } catch (err) {
         next(err);
      }
   };
   private updateDepartment = async (req: Request, res: express.Response, next: express.NextFunction) => {
      try {
         //Error handling
         const department_id = req.params.id;
         if (!Number(department_id)) {
            const error = new HttpException(404, "Invalid Request");
            throw error;
         } else {
            //validation
            const new_department_name = req.body.name;
            if (!isString(new_department_name)) {
               throw new HttpException(400, "Department Name must be a string");
            }
            const updated_department = await this.departmentService.updateDepartment(
               Number(department_id),
               new_department_name
            );
            res.status(201).send(updated_department);
         }
      } catch (err) {
         next(err);
      }
   };

   private deleteDepartment = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      try {
         //Error handling
         if (req.role != "HR") {
            console.log("if");
            throw new HttpException(403, "Not Authorized");
         } else {
            const department_id = req.params.id;
            if (!Number(department_id)) {
               const error = new HttpException(404, "Invalid Request"); //validation
               throw error;
            } else {
               const departmentWithId = await this.departmentService.getDepartmentById(Number(department_id));
               if (!departmentWithId) {
                  // console.log("entered IF");
                  const error = new HttpException(404, "department Not Found");
                  throw error;
               } else {
                  await this.departmentService.softRemove(departmentWithId);
                  res.status(200).send(departmentWithId);
               }
            }
         }
      } catch (err) {
         next(err);
      }
   };
}

export default DepartmentController;
