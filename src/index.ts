import "reflect-metadata"
import { MikroORM} from '@mikro-orm/core';
import express from 'express'
// import { Post } from './entities/Post';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostsResolver } from './resolvers/post';
import mikroOrmConfig from './mikro-orm.config';



const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  // await orm.getMigrator().up()

    
  const app = express();

  const apolloServer = new ApolloServer({
      schema: await buildSchema({
          resolvers: [HelloResolver, PostsResolver],
          validate: false
      }),
      context: () => ({em: orm.em})
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({app})

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});