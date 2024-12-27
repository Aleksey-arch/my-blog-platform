import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';

import { store } from './store/store.js';
import App from './components/App/index.jsx';
import { BrowserRouter } from 'react-router';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
);
