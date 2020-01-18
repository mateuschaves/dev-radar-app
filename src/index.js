import React from 'react';

import '~/config/ReactotronConfig';

import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import store from './store';

import Routes from '~/routes';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
    <Provider store={store}>
      <Routes />
    </Provider>
  </>
);

export default App;
