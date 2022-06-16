# Typescript-GraphQL


This is a fullstack Typescript GraphQL API project that lets users create, update, delete, and vote on posts (sort of like a mini Reddit). Redis is used as a fast way to store session cookies. TypeORM is used to communicate to the PostgreSQL database and for database migrations. Next.js is used for the frontend, with some server side rendered (SSR) components. The GraphQL API uses queries and mutations. Mutations let users modify and alter data (eg. create, update, delete).

The is project is based on Ben Awad’s Typescript GraphQL tutorial here: https://www.youtube.com/watch?v=I6ypD7qv3Z8

However, the tutorial is outdated, and the cookies are somewhat tedious to work through. Unfortunately, the cookies don’t set in the browser, but work on the backend. Working on how to fix the cookies is something that can be explored.

See the live app here: https://typescript-graphql-poster.vercel.app

### Backend:

- Express
- GraphQL
- Type-GraphQL
- Apollo Server
- Redis - Session cookies
- PostgreSQL
- TypeORM

### Frontend:

- Next.js (Typescript)
- GraphQL (Fragments, Mutations, Queries)
- URQL Client / Apollo Client
- Chakra UI
- Prettier - Formatting

### Deployment:

- Heroku (Backend)
- Vercel (Frontend)


![landing page with posts](https://github.com/jonathanleejono/Typescript-GraphQL/blob/main/assets/graphql_frontend_posts.png)
![landing page with posts](https://github.com/jonathanleejono/Typescript-GraphQL/blob/main/assets/studio_apollo_graphql.png)



