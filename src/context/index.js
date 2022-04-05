import { useAuth, AuthProvider } from "./auth-context";
import { useLike, LikeProvider } from "./like-context";
import { usePlaylist, PlaylistProvider } from "./playlist-context";
import { useHistory, HistoryProvider } from "./history-context";
import { useWatchLater, WatchLaterProvider } from "./watchLater-context";
import { useVideo, VideoProvider } from "./video-context";
import {useNotes,NotesProvider} from './notes-context';
export {
  usePlaylist,
  useLike,
  useAuth,
  useHistory,
  AuthProvider,
  LikeProvider,
  PlaylistProvider,
  HistoryProvider,
  useWatchLater,
  WatchLaterProvider,
  useVideo,
  VideoProvider,
  useNotes,
  NotesProvider
};
