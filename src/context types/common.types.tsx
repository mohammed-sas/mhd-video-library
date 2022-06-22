import { ReactNode } from "react";

export type Video = {
  _id: string;
  youtubeId: string;
  title: string;
  description: string;
  videoThumbnail: string;
  channelTitle: string;
  category: string;
  channelThumbnail: string;
};

export type Prop={
  children:ReactNode;
}