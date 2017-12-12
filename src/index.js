const {
  delegateToSchema,
  makeExecutableSchema,
  makeRemoteExecutableSchema,
} = require('graphql-tools')
const { GitHubLink } = require('./GitHubLink')
const fs = require('fs')
const path = require('path')
const { graphql } = require('graphql')
const { GraphQLServer } = require('graphql-yoga')
const { importSchema } = require('graphql-import')
const { repoNames } = require('./repoNames')

const TOKEN = '066f845b01c30994d877a748c69e4c2c4a606851'

// const gitHubTypeDefs = fs.readFileSync(
//   path.join(__dirname, '..', 'schemas', 'github.graphql'),
//   { encoding: 'utf8' },
// )

const gitHubTypeDefs = fs.readFileSync('./schemas/github.graphql', {encoding: 'utf8'})

const introspectionSchema = makeExecutableSchema({ typeDefs: gitHubTypeDefs })
const link = new GitHubLink(TOKEN)

const schema = makeRemoteExecutableSchema({
  schema: introspectionSchema,
  link,
})

const typeDefs = importSchema('schemas/app.graphql')

const resolvers = {
  Query: {
    info: (parent, { name }) => 'This app provides information about the Graphcool GitHub organization',
    graphcoolRepositories: (parent, { names }, context, info) => {
      if (!names || names.length === 0) {
        names = repoNames
      }
      return Promise.all(
        names.map(name => {
          return delegateToSchema(
            schema,
            {},
            'query',
            'repository',
            { owner: 'graphcool', name },
            context,
            info,
          )
        })
      )
    },
    graphcool: (parent, args, context, info) => {
      return delegateToSchema(
        schema,
        {},
        'query',
        'repositoryOwner',
        {login: 'graphcool'},
        context,
        info
      )
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server running on http://localhost:4000'))