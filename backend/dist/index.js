"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const path_1 = __importDefault(require("path"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const Updoot_1 = require("./entities/Updoot");
const User_1 = require("./entities/User");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const createUpdootLoader_1 = require("./utils/createUpdootLoader");
const createUserLoader_1 = require("./utils/createUserLoader");
require("reflect-metadata");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [User_1.User, Post_1.Post, Updoot_1.Updoot],
    migrations: [path_1.default.join(__dirname, "./migrations/*")],
    ssl: constants_1.PROD_ENV ? { rejectUnauthorized: false } : false,
});
const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env;
const main = async () => {
    const app = (0, express_1.default)();
    await exports.AppDataSource.initialize();
    await exports.AppDataSource.runMigrations();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default({
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT),
        username: constants_1.PROD_ENV ? REDIS_USERNAME : undefined,
        password: constants_1.PROD_ENV ? REDIS_PASSWORD : undefined,
    });
    redis.on("connect", () => {
        console.log("Connected to Redis instance!");
    });
    redis.on("error", (err) => {
        console.log("Error connecting to Redis instance: ", err);
    });
    app.set("trust proxy", 1);
    app.use((0, cors_1.default)({
        origin: [
            process.env.CORS_ORIGIN,
            process.env.PING_CHECKER,
            process.env.STUDIO_APOLLO,
        ],
        credentials: true,
    }));
    const usingApolloStudio = true;
    let usingLocalHost = false;
    app.use((req, _, next) => {
        var _a;
        if ((_a = req.headers.origin) === null || _a === void 0 ? void 0 : _a.toString().includes("http://localhost")) {
            usingLocalHost = true;
        }
        next();
    });
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({ client: redis, disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: (usingApolloStudio || constants_1.PROD_ENV) && !usingLocalHost ? "none" : "lax",
            secure: (usingApolloStudio || constants_1.PROD_ENV) && !usingLocalHost ? true : false,
        },
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    }));
    app.get("/ping", (_, res) => {
        res.send("pong!!");
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, post_1.PostsResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            userLoader: (0, createUserLoader_1.createUserLoader)(),
            updootLoader: (0, createUpdootLoader_1.createUpdootLoader)(),
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    const port = parseInt(process.env.PORT);
    app.listen(port, () => {
        console.log(`Server started on listening ${port}`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map