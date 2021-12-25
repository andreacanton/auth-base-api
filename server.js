import dotenv from "dotenv";
import http from "http";
import app from "./app";

dotenv.config();

const PORT = "5000";

app.set("port", PORT);
app.set("env", "development");
app.set("x-powered-by", false);

const server = http.createServer(app);

server.listen(PORT, "127.0.0.1", () => {
  const addrInfo = server.address();
  console.log(`Server running on //${addrInfo.address}:${addrInfo.port}`);
});
