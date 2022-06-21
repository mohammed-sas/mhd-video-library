import {PlayListState,PlaylistActions} from '../context types/playlist.types'

const playlistReducer = (state:PlayListState, { type, payload }:PlaylistActions) => {
  switch (type) {
    case "FETCHING":
      return {
        ...state,
        loading: true,
      };
    case "FETCHED":
      return {
        ...state,
        loading: false,
        playlists: payload,
      };
    case "UPDATE":
      return {
        ...state,
        playlists: payload,
      };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists.filter((list) => list._id !== payload?._id),
          payload,
        ],
      };
    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists.filter((list) => list._id !== payload?._id),
          payload,
        ],
      };
    default:
      return state;
  }
};

export { playlistReducer };
