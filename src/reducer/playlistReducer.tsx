import {PlayListState,PlaylistActions} from '../context types/playlist.types'

const playlistReducer = (state:PlayListState, actions:PlaylistActions) => {
  switch (actions.type) {
    case "UPDATE":
      return {
        ...state,
        playlists: actions.payload,
      };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state?.playlists?.filter((list) => list._id !== actions.payload._id),
          actions.payload,
        ],
      };
    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state?.playlists?.filter((list) => list._id !== actions.payload?._id),
          actions.payload,
        ],
      };
    default:
      return state;
  }
};

export { playlistReducer };
