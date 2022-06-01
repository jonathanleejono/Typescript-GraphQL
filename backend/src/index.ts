import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostsResolver } from "./resolvers/post";
import mikroOrmConfig from "./mikro-orm.config";
import { UserResolver } from "./resolvers/user";
import dotenv from "dotenv";
dotenv.config();
// import Redis from "ioredis";
const redis = require("redis");
// import { createClient } from "redis";

import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__ } from "./constants";
import { MyContext } from "./types";
// import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  // await orm.getMigrator().up()

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({ legacyMode: true });
  // const redis = new Redis("https://studio.apollographql.com");

  // await redisClient.connect();

  // app.set("trust proxy", 1);

  // this needs to come before apollo for the session middleware
  // to be used inside of apollo
  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
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

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostsResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }: MyContext): MyContext => ({ em: orm.em, req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    // cors: {
    //   origin: ["https://studio.apollographql.com"],
    //   credentials: true,
    // },

    // cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
