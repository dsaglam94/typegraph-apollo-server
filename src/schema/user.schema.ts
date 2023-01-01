import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

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

export const UserModel = getModelForClass(User);

@InputType()
export class CreateUserInput {
  @Field((_type) => String)
  name: string;

  @IsEmail()
  @Field((_type) => String)
  email: string;

  @MinLength(6, {
    message: "Password must be at least 6 characters long",
  })
  @MaxLength(50, {
    message: "Password must not be longer than 50 characters",
  })
  @Field((_type) => String)
  password: string;
}
