import { createCookieSessionStorage } from "react-router";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the same CookieOptions to create one
    cookie: {
      name: "__sidebar-session",
      secrets: ["r3m1xr0ck5"],
      sameSite: process.env.NODE_ENV === "production",
    },
  });
