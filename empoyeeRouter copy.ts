// import express from "express";
// import { Request, Response } from "express";
// import Employee from "./src/entity/employee.entity";
// import dataSource from "./src/db/data-source.db";

// const emp_Router = express.Router();

// const employees: Employee[] = [
//   {
//     id: 1,
//     email: "employee1@gmail.com",
//     name: "Employee1",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     deletedAt: new Date(),
//   },
//   {
//     id: 2,
//     email: "employee2@gmail.com",
//     name: "Employee2",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     deletedAt: new Date(),
//   },
// ];
// emp_Router.get("/", async (req: Request, res: Response) => {
//   const employee_repo = dataSource.getRepository(Employee);
//   const employee_list = await employee_repo.find();
//   console.log(req.url);
//   res.status(200).send(employee_list);
// });

// emp_Router.get("/:id", (req: Request, res: Response) => {
//   console.log(req.url);
//   //   const employee = employees.find(
//   //     (record) => record.id == Number(req.params.id)
//   //   );
//   res.status(200).send("gett");
// });

// emp_Router.post("/", async (req: Request, res: Response) => {
//   const employee_repo = dataSource.getRepository(Employee);

//   console.log(req.url);
//   const newEntry = new Employee();
//   newEntry.email = req.body.email;
//   newEntry.name = req.body.name;
//   const saved_employee = await employee_repo.save(newEntry);
//   res.status(201).send(saved_employee);
// });

// emp_Router.put("/:id", async (req: Request, res: Response) => {
//   console.log(req.params.id);

//   const employee_repo = dataSource.getRepository(Employee);
//   const employee = await employee_repo.findOneBy({ id: Number(req.params.id) });
//   employee.email = req.body.email;
//   employee.name = req.body.name;
//   const updated_employee = await employee_repo.save(employee);
//   console.log(req.body);
//   res.status(201).send(updated_employee);
// });

// emp_Router.delete("/:id", async (req: Request, res: Response) => {
//   console.log(req.url);
//   const employee_repo = dataSource.getRepository(Employee);
//   const deleted_employee = await employee_repo.softDelete(
//     Number(req.params.id)
//   );
//   res.status(201).send(deleted_employee);
// });

// export { emp_Router };
