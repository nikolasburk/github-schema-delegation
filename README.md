# github-schema-delegation

This project demonstrates how to build a custom GraphQL server on top of [GitHub's GraphQL API](https://developer.github.com/v4/) using [schema delegation](https://medium.com/@graphcool/graphql-schema-stitching-explained-schema-delegation-4c6caf468405).

## Usage

```sh
git clone git@github.com:nikolasburk/github-schema-delegation.git
cd github-schema-delegation
yarn install
yarn start
```

## Overview

Notice that this project has two branches:

- [master](https://github.com/nikolasburk/github-schema-delegation): Basic implementation based on `delegateSchema` from `graphql-tools`
- [gh-binding](https://github.com/nikolasburk/github-schema-delegation/tree/gh-binding): Same functionality but implemented using the [`graphql-binding-github`](https://github.com/graphcool/graphql-binding-github) for convenience and less boilerplate