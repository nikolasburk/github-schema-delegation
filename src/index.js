const { GitHub } = require('graphql-binding-github')
const { GraphQLServer } = require('graphql-yoga')
const { importSchema } = require('graphql-import')
const { repoNames } = require('./repoNames')

const TOKEN = ''
const github = new GitHub(TOKEN)

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
          return github.delegate(
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
      return github.delegate(
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