import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { COOKIE_NAME, PROD_ENV, USE_STUDIO_APOLLO } from "./constants";
import { Post } from "./entities/Post";
import { Updoot } from "./entities/Updoot";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PostsResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import { createUpdootLoader } from "./utils/createUpdootLoader";
import { createUserLoader } from "./utils/createUserLoader";
//type-graphql and typeorm need reflect-metadata to work
import "reflect-metadata";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL as string,
  synchronize: true,
  logging: true,
  entities: [User, Post, Updoot],
  migrations: [path.join(__dirname, "./migrations/*")],
  ssl: PROD_ENV ? { rejectUnauthorized: false } : false,
});

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  CORS_ORIGIN,
  STUDIO_APOLLO,
} = process.env;

const main = async () => {
  const app = express();

  await AppDataSource.initialize();

  // keep commented if migrations already ran
  await AppDataSource.runMigrations();

  const RedisStore = connectRedis(session);

  const redis = new Redis({
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT as string),
    username: PROD_ENV ? REDIS_USERNAME : undefined,
    password: PROD_ENV ? REDIS_PASSWORD : undefined,
  });

  redis.on("connect", () => {
    console.log("Connected to Redis instance!");
  });

  redis.on("error", (err) => {
    console.log("Error connecting to Redis instance: ", err);
  });

  //this must be here for apollo studio
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [CORS_ORIGIN as string, STUDIO_APOLLO as string],
      credentials: true,
    })
  );

  // this needs to come before apollo for the
  // session middleware to be used inside of apollo
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: USE_STUDIO_APOLLO || PROD_ENV ? "none" : "lax",
        secure: USE_STUDIO_APOLLO || PROD_ENV ? true : false,
      },
      secret: process.env.SECRET as string,
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
    context: ({ req, res }: MyContext): MyContext => ({
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
    console.log(`Server started on listening ${port}`);
  });
};

main().catch((err) => {
  console.error(err);
});
