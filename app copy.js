const express = require("express");

const server = new express();

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hellooooo ");
});

server.get("/employee", (req, res) => {
  console.log(req.url);
  res.status(200).send("I am Sanoj");
});

server.get("/data", (req, res) => {
  let data = {
    profile: {
      name: "Sanoj",
      age: 22,
    },
  };
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
