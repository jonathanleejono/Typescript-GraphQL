import { EntityManager, Connection, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";

// interface ExtendedRequest extends Request {
//   session: Session & Partial<SessionData> & Request & { userId: number };
// }

// export type SessionWithUser = Session &
//   Partial<Session> & { userId: string | {} };

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
    // session: ExtendedRequest;
  };
  res: Response;
  redis: Redis;
};
