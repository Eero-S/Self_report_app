import { envConfig } from "../deps.js";

let config = {};

if (Deno.env.get("TEST_ENVIRONMENT")) {
  config.database = {};
} else if (Deno.env.get("DATABASE_URL")) {
  config.database = Deno.env.toObject().DATABASE_URL;
} else {
  config.database = {
    hostname: envConfig()["HOSTNAME"],
    database: envConfig()["DATABASE"],
    user: envConfig()["USER"],
    password: envConfig()["PASSWORD"],
    port: Number(envConfig()["PORT"]),
  };
}

export { config };
