import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { resolvers } from "./resolvers";
import connectDb from "./utils/mongo";
import Context from "./types/context";
import { verifyJwt } from "./utils/jwt";
import { User } from "./schema/user.schema";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers,
    // authCheckers
    validate: {
      forbidUnknownValues: false,
    },
  });

  const app = express();

  app.use(cookieParser());

  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      const context = ctx;

      if (ctx.req.cookies.accessToken) {
        const user = verifyJwt<User>(ctx.req.cookies.accessToken);

        context.user = user;
      }

      return context;
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault
        : ApolloServerPluginLandingPageGraphQLPlayground,
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  connectDb();

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(
      `Server is listening on port http://localhost:${process.env.PORT || 4000}`
    )
  );
}

bootstrap();
