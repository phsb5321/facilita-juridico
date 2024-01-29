import redis from "@/clients/RedisClient";
import { CLIENT_CREATED, CLIENT_DELETED, CLIENT_UPDATED } from "@/constants";
import clientEmitter from "@/constants/ClientEvents";

// Log client creation
clientEmitter.on(CLIENT_CREATED, (client) => {
  console.log("Client created:", client);
});

// Log client update
clientEmitter.on(CLIENT_UPDATED, (client) => {
  console.log("Client updated:", client);
});

// Log client deletion
clientEmitter.on(CLIENT_DELETED, (clientId) => {
  console.log("Client deleted:", clientId);
});

clientEmitter.on(CLIENT_CREATED, async (client) => {
  console.log("Client created:", client);
  await redis.del("shortestRoute");
});
