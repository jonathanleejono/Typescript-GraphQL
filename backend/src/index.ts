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
import { COOKIE_NAME, __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { Updoot } from "./entities/Updoot";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PostsResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import { createUpdootLoader } from "./utils/createUpdootLoader";
import { createUserLoader } from "./utils/createUserLoader";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL as string,
  synchronize: true,
  logging: true,
  entities: [User, Post, Updoot],
  migrations: [path.join(__dirname, "./migrations/*")],
  ssl: { rejectUnauthorized: false },
});
// const __dirname = dirname(fileURLToPath(import.meta.url));

const main = async () => {
  const app = express();
  //comment out for testing

  //only use when deploying
  // app.use(express.static(path.resolve("./frontend/out")));

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
        process.env.CORS_ORIGIN as string,
        "https://studio.apollographql.com",
        // "http://localhost:3000",
        // "http://localhost:4000/graphql",
      ],
      credentials: true,
    })
  );

  // app.get("*", (_, res) => {
  //   res.sendFile(path.resolve("./frontend/out", "index.html"));
  // });
  // USE npm run watch whenever changes happen
  // test

  // this needs to come before apollo for the session middleware
  // to be used inside of apollo
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: __prod__ ? "none" : "lax", //must be none for apollo studio
        secure: __prod__ ? true : false, //must be true for apollo studio
        // domain: __prod__
        //   ? "typescript-graphql-poster.herokuapp.com"
        //   : undefined,
      },
      secret: process.env.SECRET as string,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.get("/ping", (_, res) => {
    res.send("pong!!!!!");
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
    introspection: true,
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
