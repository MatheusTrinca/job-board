import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@as-integrations/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { readFile } from 'node:fs/promises';
import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.js';
import { getUser } from './db/users.js';
import { createCompanyLoader } from './db/companies.js';

const PORT = 9000;

const typeDefs = await readFile('./schema.graphql', 'utf-8');

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(cors(), express.json());

app.post('/login', handleLogin);

async function getContext({ req }) {
  const context = {};
  if (req.auth) {
    context.user = await getUser(req.auth.sub);
  }
  context.companyLoader = createCompanyLoader();
  return context;
}

app.use(authMiddleware, apolloMiddleware(server, { context: getContext }));

await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`);
console.log(`🚀 GraphQL endpoint: http://localhost:${PORT}/graphql`);
