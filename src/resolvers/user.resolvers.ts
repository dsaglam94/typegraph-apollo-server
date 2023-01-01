import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput, LoginInput, User } from "../schema/user.schema";
import UserService from "../service/user.service";
import Context from "../types/context";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation((_of) => User)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation((_of) => String) // Returns JWT
  login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Query((_of) => User, { nullable: true })
  me(@Ctx() context: Context) {
    return context.user;
  }
}
