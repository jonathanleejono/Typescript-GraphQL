import { Entity, PrimaryKey, Property, OptionalProps } from "@mikro-orm/core";
// import { ObjectType, Field } from "type-graphql";

// @ObjectType()
@Entity()
export class Post {
 
  @PrimaryKey()
  id!: number;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: "text" })
  title: string;

  [OptionalProps]?: "title" | "updatedAt" | "createdAt";
}


