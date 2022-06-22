
import {UserState,UserActions} from '../context types/auth.types'
const authReducer = (state:UserState, actions:UserActions) => {
  switch (actions.type) {
    case "SET_USER":
      return {
        ...state,
        user: actions.payload,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: actions.payload,
      };
    default:
        return state;
  }
};

export {authReducer};