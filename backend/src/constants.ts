import dotenv from "dotenv";

dotenv.config();

// PROD_ENV equals true or false
export const PROD_ENV = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
export const FORGET_PASSWORD_PREFIX = "forget-password:";
// CORS_LOCALHOST equals true or false
export const CORS_LOCALHOST =
  process.env.CORS_ORIGIN === "http://localhost:3000";
