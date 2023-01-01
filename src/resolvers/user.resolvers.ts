import { Query, Resolver } from "type-graphql";
import { User } from "../schema/user.schema";

@Resolver()
export default class UserResolver {
  @Query((_of) => User)
  me() {
    return {
      _id: "123",
      name: "Dogan Saglam",
      email: "dogan@gmail.com",
    };
  }
}
