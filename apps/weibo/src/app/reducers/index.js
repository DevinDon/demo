import { combineReducers } from 'redux';
import comments from './comments';
import timeline from './timeline';

const rootReducer = combineReducers({
  timeline,
  comments,
});

export default rootReducer;
