import Koa from 'koa'
import serve from 'koa-static'
import path from 'path'
import { ApolloServer } from 'apollo-server-koa'

import typeDefs from './schema.graphql'
import resolvers from './resolvers'
import userAPI from './datasources/user'
import messageAPI from './datasources/message'
import { PORT } from '../config'
import router from './routes'

const staticPath = path.join(__dirname, '../../public/')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    userAPI,
    messageAPI,
  }),
})

const app = new Koa()
server.applyMiddleware({ app })

app.use(router.routes()).use(router.allowedMethods())
app.use(serve(staticPath))

const port = PORT
const host = 'localhost'

app.listen(port, host, () =>
  console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`),
)
