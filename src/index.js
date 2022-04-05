import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  LikeProvider,
  PlaylistProvider,
  AuthProvider,
  HistoryProvider,
  WatchLaterProvider,
  VideoProvider,
  NotesProvider,
} from "./context";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <VideoProvider>
          <PlaylistProvider>
            <LikeProvider>
              <HistoryProvider>
                <WatchLaterProvider>
                  <NotesProvider>
                    <App />
                  </NotesProvider>
                </WatchLaterProvider>
              </HistoryProvider>
            </LikeProvider>
          </PlaylistProvider>
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
