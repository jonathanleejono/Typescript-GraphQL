import { Options } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import dotenv from "dotenv";
dotenv.config();
import { User } from "./entities/User";

const mikroOrmConfig: Options = {
  migrations: {
    path: path.join(__dirname, "./migrations"),
  },
  entities: [Post, User],
  dbName: "typescript-graphql",
  type: "postgresql",
  password: process.env.DB_PASSWORD,
  debug: !__prod__,
  allowGlobalContext: true,
};

export default mikroOrmConfig;
