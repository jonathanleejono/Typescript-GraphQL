# Typescript-GraphQL

This is a fullstack Typescript GraphQL API project that lets users create, update, delete, and vote on posts (sort of like a mini Reddit). Redis is used as a fast way to get and set user sessions. TypeORM is used to communicate to the PostgreSQL database and for database migrations. Next.js is used for the frontend, with some server side rendered (SSR) components. The GraphQL API uses queries and mutations from a single endpoint, unlike RESTful APIs which are based around multiple endpoints.

The is project is based on Ben Awad’s Typescript GraphQL tutorial here: https://www.youtube.com/watch?v=I6ypD7qv3Z8

Cookies can be tricky to deal with when using Studio Apollo and GraphQL. In the case of Studio Apollo the settings need to be "sameSite='none'", and "secure=true", as well as the headers in Studio Apollo need to use a key "x-forwarded-proto" with a value "https". If using a frontend with the API, ensure "credentials: 'include'" are used for the Apollo frontend client. As well as, the backend's cookie settings must be changed to "secure=false" and "sameSite='lax'" (or 'strict') if using HTTP (eg. using localhost either with a local frontend or an HTTP link in an API client like Postman). The backend's 'app.set("trust proxy", 1)' setting is also used for cookies.

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
