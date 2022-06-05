import "reflect-metadata";
import express from "express";
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
//type-graphql and typeorm need reflect-metadata to work
import path from "path";

// needs to use const redis = require("redis") with the legacy mode for tutorial to work
// const redis = require("redis");

import { User } from "./entities/User";
import { Post } from "./entities/Post";

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

  await Post.delete({});

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  // start redis-server, as well as DONT HAVE A SLASH AT THE END
  // the slash at the end was because of the copy and paste from
  // the studio apollo website
  app.use(
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );

  // this needs to come before apollo for the session middleware
  // to be used inside of apollo
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", //csrf
        secure: __prod__, //cookie only works in https
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
    context: ({ req, res }) => ({
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
