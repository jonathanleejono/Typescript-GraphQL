import { InputType, Field } from "type-graphql";

// declare module "express-session" {
//   export interface SessionData {
//     userId: number;
//   }
// }

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}
