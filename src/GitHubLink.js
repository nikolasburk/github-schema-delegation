const { FetchOptions, HttpLink } = require('apollo-link-http') 
const fetch = require('node-fetch')

class GitHubLink extends HttpLink {
  constructor(token) {
    if (!token) {
      throw new Error(
        'No Github token provided. Create one here: https://github.com/settings/tokens (Guide: https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql)',
      )
    }
    super({
      uri: 'https://api.github.com/graphql',
      headers: { Authorization: `Bearer ${token}` },
      fetch,
    })
  }
}

module.exports = { GitHubLink }