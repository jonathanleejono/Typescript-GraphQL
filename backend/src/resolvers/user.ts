import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  Resolver,
  InputType,
  Arg,
  Field,
  Mutation,
  Ctx,
  ObjectType,
} from "type-graphql";
import argon2 from "argon2";

// declare module "express-session" {
//   export interface SessionData {
//     userId: number;
//   }
// }

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 2",
          },
        ],
      };
    }
    if (options.password.length <= 8) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 8",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already exists",
            },
          ],
        };
      }
      return error.message;
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [{ field: "username", message: "that username doesn't exist" }],
      };
    }
    const validPassword = await argon2.verify(user.password, options.password);

    if (!validPassword) {
      return {
        errors: [{ field: "password", message: "incorrect password" }],
      };
    }

    req.session.userId = user.id;

    return { user };
  }
}
