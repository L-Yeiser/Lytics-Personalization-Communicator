import React from 'react';
import { render } from 'react-dom';
// eslint-disable-next-line no-unused-vars
import styleMain from './styles/main-styles.less';
import Landing from './Landing';

const App = () => (
  <div className="app">
    <Landing />
  </div>
);

const renderApp = () => {
  render(<App />, document.getElementById('root'));
};

renderApp();
