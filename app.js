const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200);
  res.end("Helloo");
});

server.listen(3000, () => {
  console.log("Server is running....on 3000");
});
