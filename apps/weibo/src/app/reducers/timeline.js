import { ADD_POST, GET_HOME_TIMELINE, GET_PUBLIC_TIMELINE, SET_CURRENT_POST } from '../constants/actions';

const initState = {
  home: { posts: [], page: 0 }
};

export default function reducer(state = initState, action) {
  const { statuses, id, status } = action.payload || {};
  const { page } = action.params || {};
  switch (action.type) {
    case GET_HOME_TIMELINE:
    case GET_PUBLIC_TIMELINE:
      return {
        ...state,
        home: {
          posts: [...state.home.posts, ...statuses],
          page,
        },
      };
    case ADD_POST:
      return {
        ...state,
        home: {
          posts: [status, ...state.home.posts],
          page,
        }
      }
    case SET_CURRENT_POST:
      return {
        ...state,
        current: id,
      };
    default:
      return state;
  }
}
