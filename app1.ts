const express = require("express");
import { Request, Response } from "express";
const server = new express();

server.get("/", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("Hellooooo ");
});

server.get("/employee", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("I am Sanoj");
});
interface Profile {
  name: string;
  age: number;
}
interface Data {
  profile: Profile;
  class: string;
}
server.get("/data", (req: Request, res: Response) => {
  let data: Data = {
    profile: {
      name: "Sanoj",
      age: 22,
    },
    class: "B",
  };
  data.profile.name = "99";
  console.log(data.profile.name);
  res.status(200).send(data);
});
server.listen(3000, () => {
  console.log("Server is running....on 3000");
});

const avg = function avg(a, b) {
  return "(a + b) / 2";
};
console.log("average : ", avg(2, 3));
