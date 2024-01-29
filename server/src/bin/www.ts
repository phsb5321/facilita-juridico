import "@/handlers/ClientEventHandlers";

import debug from "debug";
import dotenv from "dotenv";
import http from "http";

import app from "@/app";
import { query } from "@/clients/PostgresClient";
import { validateEnv } from "@/config/envSchema";

dotenv.config();

import type { Server } from "http";
import type { HttpError } from "http-errors";
const { PORT } = validateEnv(process.env);

const log = debug("ts-express-swc:server");

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val; // named pipe
  if (port >= 0) return port; // port number
  return false;
};

const port = normalizePort(PORT);

const onError = (error: HttpError) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind =
    typeof port === "string" ? `Pipe ${port}` : `Port ${port as number}`;

  if (error.code === "EACCES") {
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
  } else if (error.code === "EADDRINUSE") {
    console.error(`${bind} is already in use`);
    process.exit(1);
  } else {
    throw error;
  }
};

const onListening = (server: Server) => {
  let bind = "unknown";
  const addr = server.address();
  if (typeof addr === "string") {
    bind = `pipe ${addr}`;
  } else if (addr) {
    bind = `port ${addr.port}`;
  }
  log(`Listening on ${bind}`);
};

const start = async () => {
  // Connect to PostgreSQL Database

  try {
    await query("SELECT NOW()");
    console.log("Connected to PostgreSQL database");
  } catch (err) {
    console.error("Failed to connect to PostgreSQL database", err);
    process.exit(1);
  }

  app.set("port", port);

  const server = http.createServer(app);
  server.listen(port);
  server.on("error", onError);
  server.on("listening", () => onListening(server));
};

start().catch((err) => {
  log(err);
  process.exit(1);
});
