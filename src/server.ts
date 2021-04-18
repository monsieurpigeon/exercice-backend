import { ApolloServer } from "apollo-server-express"
import * as Express from "express"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { FileResolver } from "./FileService/resolver"

async function startServer() {
  const schema = await buildSchema({
    resolvers: [FileResolver],
    emitSchemaFile: true,
  })
  const app = Express()
  const server = new ApolloServer({
    schema,
    context: () => ({}),
  })
  server.applyMiddleware({ app })
  const PORT = 8080
  app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
  })
}
startServer()