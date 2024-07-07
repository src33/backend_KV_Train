import express from "express";
import { Request, Response } from "express";
import employeeRouter from "./routes/employee.Routes";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import { error } from "console";
import errorMiddleware from "./middleware/error.middleware";
import { RequestWithUser } from "./utils/requestWithUser";
import departmentRouter from "./routes/department.routes";

const server = express();

server.use(loggerMiddleware);
server.use(bodyParser.json());
server.use("/employee", employeeRouter);
server.use("/department", departmentRouter);
server.use(errorMiddleware);

server.get("/", (req: RequestWithUser, res: Response) => {
   console.log(req.url);
   res.status(200).send("Home ");
});

(async () => {
   try {
      await dataSource.initialize();
   } catch (e) {
      console.log("failed", e);
      process.exit(1);
   }
   server.listen(3000, () => {
      console.log("Server UPP..");
   });
})();
