import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
//type-graphql and typeorm need reflect-metadata to work
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { COOKIE_NAME } from "./constants";
import { Post } from "./entities/Post";
import { Updoot } from "./entities/Updoot";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PostsResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import { createUpdootLoader } from "./utils/createUpdootLoader";
import { createUserLoader } from "./utils/createUserLoader";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL as string,
  synchronize: true,
  logging: true,
  entities: [User, Post, Updoot],
  migrations: [path.join(__dirname, "./migrations/*")],
  // ssl: { rejectUnauthorized: false },
});

const main = async () => {
  const app = express();

  await AppDataSource.initialize();

  // await AppDataSource.runMigrations();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  //this must be here for apollo studio
  app.set("trust proxy", process.env.NODE_ENV !== "production");

  // https://studio.apollographql.com

  app.use(
    cors({
      origin: [
        "https://studio.apollographql.com",
        process.env.CORS_ORIGIN as string,
      ],
      credentials: true,
    })
  );

  // USE npm run watch whenever changes happen

  // IMPORTANT NOTES - set everything below to be like this:
  // httpOnly: false,
  // sameSite: "lax",
  // secure: false,
  // ^^this allows the cookie to be set in browser on localhost:3000
  // httpOnly: true OR false,
  // sameSite: "none",
  // secure: true,
  // ^^that works for apollo studio
  // httpOnly: true OR false,
  // sameSite: "none",
  // secure: false,
  // ^^that works for postman --> make sure to delete existing cookie to reset

  // this needs to come before apollo for the session middleware
  // to be used inside of apollo
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: false,
        sameSite: "lax", //must be hard coded -> none for apollo studio
        secure: true, //must be hard coded -> true for apollo studio
      },
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.get("/ping", (_, res) => {
    res.send("pong!!");
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
      userLoader: createUserLoader(),
      updootLoader: createUpdootLoader(),
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const port = parseInt(process.env.PORT as string);

  app.listen(port, () => {
    console.log(`server started on listening ${port}`);
  });
};

main().catch((err) => {
  console.error(err);
});
