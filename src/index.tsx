import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { AllRoutes } from './routes';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"
import { Provider } from 'react-redux';
import store from './redux/store';

const token= JSON.parse(localStorage.getItem("AUTH_TOKEN")||"");

const client= new ApolloClient({
  uri: "https://flas-hcard-api.herokuapp.com",
  cache: new InMemoryCache(),
  headers:{
    "Authorization": `Bearer ${token?.token}`
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Provider store={store}>
      <AllRoutes />
    </Provider>
    </ApolloProvider>
  </React.StrictMode>
);


