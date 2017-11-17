import React, { Component } from 'react';
import { ApolloProvider} from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeView from './components/HomeView';
import CreateUser from './components/CreateUser';
import UserDetails from './components/UserDetails';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <Router>
          <div>
            <Switch>
              <Route exact path="/user/create" component={CreateUser} />
              <Route exact path="/user/:id" component={UserDetails} />
              <Route path="/" component={HomeView} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
