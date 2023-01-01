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

async function bootstrap() {
  const schema = await buildSchema({
    resolvers,
    // authCheckers
  });

  const app = express();

  app.use(cookieParser());

  const server = new ApolloServer({
    schema,
    context: (ctx) => {
      console.log("ctx:", ctx);
      return ctx;
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault
        : ApolloServerPluginLandingPageGraphQLPlayground,
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(
      `Server is listening on port http://localhost:${process.env.PORT || 4000}`
    )
  );
}

bootstrap();
