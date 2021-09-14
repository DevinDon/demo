import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { StoreContext } from 'redux-react-hook';
import thunk from 'redux-thunk';
import App from './app/App';
import reducers from './app/reducers';
import './styles.scss';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
  ,
  document.getElementById('root')
);
