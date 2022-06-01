import { EntityManager, Connection, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

// interface ExtendedRequest extends Request {
//   session: Session & Partial<SessionData> & Request & { userId: number };
// }

// export type SessionWithUser = Session &
//   Partial<Session> & { userId: string | {} };

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & {
    session: Session & Partial<SessionData> & Request & { userId: number };
  };
  res: Response;
};

// {"Access-Control-Allow-Origin": "https://studio.apollographql.com",
// "Access-Control-Allow-Credentials": true}
