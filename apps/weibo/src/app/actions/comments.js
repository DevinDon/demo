import { message } from 'antd';
import * as api from '../api/comments';
import { ADD_COMMENT, GET_COMMENTS, REMOVE_COMMENT, RESET_COMMENTS } from '../constants/actions';

export function createComment(params = {}, isFirst) {
  return async dispatch => {
    try {
      const result = await api.createComment(params);
      if (result) {
        message.success('评论成功');
        if (!isFirst) {
          dispatch({
            type: ADD_COMMENT,
            payload: result,
          });
        }
      }
    } catch (e) {
      message.error('评论失败，请检查网络连接');
    }
  };
}


export function getComments(params = {}) {
  return async dispatch => {
    const { comments = [], status } = await api.getComments(params);
    dispatch({
      type: GET_COMMENTS,
      payload: {
        comments,
        params,
        total: status.comments_count,
      },
    });
  };
}


export function resetComments() {
  return async dispatch => {
    dispatch({
      type: RESET_COMMENTS,
    });
  };
}


export function deleteComment(payload = {}) {
  return async dispatch => {
    const { id } = await api.deleteComment(payload);
    if (id) {
      message.success('评论删除成功');
      dispatch({
        type: REMOVE_COMMENT,
        payload: id,
      });
    } else {
      message.error('评论删除失败');
    }
  };
}
