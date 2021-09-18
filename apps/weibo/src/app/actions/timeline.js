import * as api from '../api/timeline';
import { ADD_POST, GET_HOME_TIMELINE, GET_PUBLIC_TIMELINE, SET_CURRENT_POST } from '../constants/actions';
import { resetComments } from './comments';

export function getHomeTimeline(params = {}) {
  return async dispatch => {
    const result = await api.getHomeTimeline(params);
    dispatch({
      type: GET_HOME_TIMELINE,
      payload: result,
      params,
    });
  };
}

export function getPublicTimeline(params = {}) {
  return async dispatch => {
    const result = await api.getPublicTimeline(params);
    dispatch({
      type: GET_PUBLIC_TIMELINE,
      payload: result,
      params,
    });
  };
}

export function addPost(body = {}) {
  return async dispatch => {
    const result = await api.addPost(body);
    dispatch({
      type: ADD_POST,
      payload: { status: result },
      body,
    })
  };
}

export function setCurrentPost(payload = {}) {
  return async dispatch => {
    await dispatch(resetComments());
    dispatch({
      type: SET_CURRENT_POST,
      payload,
    });
  };
}
