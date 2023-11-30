import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './redux/store';

const root = document.getElementById('root');

const render = (Component) => {
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <Component />
      
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
      />
    </Provider>
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
