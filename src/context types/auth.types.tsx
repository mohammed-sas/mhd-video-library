import { Video } from "./common.types";
import { Playlist } from "./playlist.types";
import { Notes } from "./notes.types";
export type User = {
  _id: string;
  email: string;
  firstName: string;
  history: Video[];
  lastName: string;
  likes: Video[];
  mobile: number;
  notes: Notes[];
  playlists: Playlist[];
  createdAt:string,
  updatedAt:string
};

export type UserState = {
  user: User|null;
};
export type UserActions =
  | {
      type: "SET_USER";
      payload: User;
    }
  | {
      type: "DELETE_USER";
      payload: User|null;
    };

export type LoginData = {
  email: string;
  password: string;
};

export type SignupData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};
export interface ContextInterface {
  currentUserState: UserState;
  signUp: (user: SignupData) => {},
  login: (user: LoginData) => {},
  logout:()=> void,
}
