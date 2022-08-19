const http = require("http");
const { randomUUID } = require("crypto");

let users = [];

const server = http.createServer((request, response) => {
  if (request.method === "POST") {
    request.on("data", (data) => {
      const body = JSON.parse(data);
      const user = {
        ...body,
        id: randomUUID(),
      };
      users.push();
      return response.end(JSON.stringify(user));
    });
  }
});

server.listen(3000, () => console.log("Server is runner on port 3000"));
