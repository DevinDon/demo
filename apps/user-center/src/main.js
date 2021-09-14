import 'antd/dist/antd.less';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { StoreContext } from 'redux-react-hook';
import thunk from 'redux-thunk';
import App from './app/app';
import reducers from './app/reducers';
import './styles.less';

const store = createStore(
  reducers,
  applyMiddleware(thunk),
)

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
  ,
  document.getElementById('root')
);
