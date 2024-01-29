import { validateEnv } from "@/config/envSchema";
import Redis from "ioredis";


const { REDIS_HOST, REDIS_PORT } = validateEnv(process.env);

const redis = new Redis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT, 10)
});

export default redis;
