const http = require("http");

const server = http.createServer((request, response) => {});

server.listen(3000, () => console.log("Server is runner on port 3000"));
