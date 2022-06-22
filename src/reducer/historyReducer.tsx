import {HistoryState,HistoryActions} from '../context types/history.types'

const historyReducer = (state:HistoryState, actions:HistoryActions):HistoryState => {
  switch (actions.type) {
    case "ADD":
      return {
        ...state,
        history: actions.payload,
      };
    case "DELETE":
      return {
        ...state,
        history: actions.payload,
      };
    case "CLEAR":
      return {
        ...state,
        history: actions.payload,
      };
    case "UPDATE":
      return {
        ...state,
        history: actions.payload,
      };
    default:
      return state;
  }
};

export { historyReducer };
