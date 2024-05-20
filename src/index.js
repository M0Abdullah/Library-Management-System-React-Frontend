import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './Ui.MainFramework/Main';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './Usecases/Store/Index';

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
