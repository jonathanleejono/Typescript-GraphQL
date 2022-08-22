# Typescript-GraphQL


This is a fullstack Typescript GraphQL API project that lets users create, update, delete, and vote on posts (sort of like a mini Reddit). Redis is used as a fast way to store session cookies. TypeORM is used to communicate to the PostgreSQL database and for database migrations. Next.js is used for the frontend, with some server side rendered (SSR) components. The GraphQL API uses queries and mutations from a single endpoint, unlike RESTful APIs which are based around multiple endpoints. 

The is project is based on Ben Awad’s Typescript GraphQL tutorial here: https://www.youtube.com/watch?v=I6ypD7qv3Z8

Cookies can be tricky to deal with. If a frontend dev server on localhost is used to fetch data from the backend, then the cookie settings should be "sameSite:lax" and "secure:false" to be able to set the cookie. These settings may be different for using an API client like Postman. 

Check out the live app here: https://typescript-graphql-posts.vercel.app/


### Backend:

- Express
- GraphQL
- Type-GraphQL
- Apollo Server
- Redis - Session cookies
- PostgreSQL
- TypeORM

### Frontend:

- Next.js/React (Typescript)
- GraphQL (Fragments, Mutations, Queries)
- Apollo Client
- Chakra UI
- Prettier - Formatting


![landing page with posts](https://github.com/jonathanleejono/Typescript-GraphQL/blob/main/assets/graphql_frontend_posts.png)
![landing page with posts](https://github.com/jonathanleejono/Typescript-GraphQL/blob/main/assets/studio_apollo_graphql.png)



