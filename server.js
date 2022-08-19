const http = require("http");
const { randomUUID } = require("crypto");

let users = [];

const server = http.createServer((request, response) => {
  if (request.url.startsWith("/users")) {
    if (request.method === "POST") {
      request.on("data", (data) => {
        const body = JSON.parse(data);
        const user = {
          ...body,
          id: randomUUID(),
        };
        users.push(user);
        return response.end(JSON.stringify(user));
      });
    }

    if (request.method === "GET") {
      return response.end(JSON.stringify(users));
    }

    if (request.method === "PUT") {
      const paramsSplit = request.url.split("/");
      const id = paramsSplit[2];

      request.on("data", (data) => {
        const body = JSON.parse(data);
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex <= -1) {
          return response.end(
            JSON.stringify({ message: "Usuario não encontrado!" })
          );
        }

        users[userIndex] = {
          ...body,
          id,
        };

        return response.end(JSON.stringify("Usuario alterado com sucesso."));
      });
    }
  }
});

server.listen(3000, () => console.log("Server is runner on port 3000"));
