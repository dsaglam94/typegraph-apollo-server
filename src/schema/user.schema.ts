import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field((_type) => String)
  _id: string;

  @Field((_type) => String)
  @prop({ required: true })
  name: string;

  @Field((_type) => String)
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;
}
