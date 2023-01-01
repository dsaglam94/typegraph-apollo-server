import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";

@pre<User>("save", async function () {
  // Check if the password is being modified
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
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
