import express from "express";
import { Request, Response } from "express";
import { emp_Router } from "./empoyeeRouter";
import loggerMiddleware from "./loggerMiddleware";
import bodyParser from "body-parser";
import dataSource from "./data-source";

const server = express();

server.use(loggerMiddleware);
server.use(bodyParser.json());
server.use("/employee", emp_Router);

server.get("/", (req: Request, res: Response) => {
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
