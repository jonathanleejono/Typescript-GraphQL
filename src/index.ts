import { MikroORM} from '@mikro-orm/core';
// import express from 'express'
import { Post } from './entities/Post';
// import { ApolloServer } from 'apollo-server-express';
// import { buildSchema } from 'type-graphql';
// import { HelloResolver } from './resolvers/hello';
import mikroOrmConfig from './mikro-orm.config';



const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up()
  const post = orm.em.fork({}).create(Post, { title: 'my first post' })
  await orm.em.persistAndFlush(post)

const posts = await orm.em.find(Post, {})
console.log("HELLO: ", posts)
    
//   const app = express();





//   app.listen(4000, () => {
//     console.log("server started on localhost:4000");
//   });
};

main().catch((err) => {
  console.error(err);
});