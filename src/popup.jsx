import React from 'react';
import {render} from 'react-dom';

import stylemain from './styles/main-styles.less'

const App = () => (
  <div className="app">
    <h1>Hello World</h1>
  </div>
);

const renderApp = () => {
  render(
    <App />,
    document.getElementById('root')
  )
}

console.log('WTF');
renderApp();
