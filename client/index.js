import React, { Component } from 'react'
import { render } from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'

import introspectionQueryResultData from './fragmentTypes.json'
import App from './src/app'
import './index.css'
import 'video-react/dist/video-react.css'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const cache = new InMemoryCache({ fragmentMatcher })
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: '/graphql',
    headers: {
      authorization: localStorage.getItem('token'),
      'client-name': 'Space Explorer [web]',
      'client-version': '1.0.0',
    },
  }),
})

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  },
})

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
