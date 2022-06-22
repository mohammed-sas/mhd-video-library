import {WatchLaterActions,WatchLaterState} from '../context types/watchLater.types';

const watchLaterReducer = (state:WatchLaterState,{type,payload}:WatchLaterActions):WatchLaterState => {
  switch (type) {
    case "ADD":
      return {
        ...state,
        watchLater: payload,
      };
    case "DELETE":
      return {
        ...state,
        watchLater: payload,
      };
    case "UPDATE":
      return {
        ...state,
        watchLater: payload,
      };
    default:
      return state;
  }
};

export { watchLaterReducer };
