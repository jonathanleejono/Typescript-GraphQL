import express from "express";
//type-graphql and typeorm need reflect-metadata to work
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostsResolver } from "./resolvers/post";

import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { COOKIE_NAME, __prod__ } from "./constants";

import cors from "cors";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import path from "path";

import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { MyContext } from "./types";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "typescript-graphql2",
  synchronize: true,
  logging: true,
  entities: [User, Post],
  // subscribers: [],
  migrations: [path.join(__dirname, "./migrations/*")],
});

const main = async () => {
  const app = express();

  await AppDataSource.initialize();

  await AppDataSource.runMigrations();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );

  //this must be here for apollo studio
  app.set("trust proxy", process.env.NODE_ENV !== "production");

  // this needs to come before apollo for the session middleware
  // to be used inside of apollo
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: __prod__ ? "lax" : "none", //must be none for apollo studio
        secure: __prod__, //must be true for apollo studio
      },
      secret: "dsdsdsdaq2E2ZPownuwwkyyi",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.get("/", (_, res) => {
    res.send("hello");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostsResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
