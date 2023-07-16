import { planetscale } from "@lucia-auth/adapter-mysql";
import lucia from "lucia-auth"
import { qwik } from "lucia-auth/middleware"
import { connection } from "~/db";

export const auth = lucia({
  adapter: planetscale(connection),
  env: process.env.NODE_ENV === "production" ? "PROD" : "DEV",
  middleware: qwik(),
  transformDatabaseUser: (user) => ({
    userId: user.id,
    username: user.username,
    names: user.names,
    last_names: user.last_names
  })
});

export type Auth = typeof auth;
