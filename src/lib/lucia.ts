import { planetscale } from "@lucia-auth/adapter-mysql";
import {lucia} from "lucia"
import { qwik } from "lucia/middleware"
import { connection } from "~/db";


export const auth = lucia({
  adapter: planetscale(connection, {
    user: 'auth_user',
    key: 'auth_key',
    session: 'user_session',
  }),
  env: process.env.NODE_ENV === "production" ? "PROD" : "DEV",
  middleware: qwik(),
  getUserAttributes: (user) => ({
    userId: user.id,
    username: user.username,
    names: user.names,
    last_names: user.last_names
  })
});

export type Auth = typeof auth;
