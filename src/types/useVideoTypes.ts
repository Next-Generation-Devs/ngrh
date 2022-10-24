import { MutableRefObject } from "react";

export interface DefaultOptions {
  initialPlaySpeed: number;
  initialStartTime: number;
  stopAt: number;
  pauseAt: number;
}

export type GetDefaultOptions = () => DefaultOptions;

export interface UseVideoReturnObject {
  playVideo: VoidFunction;
  pauseVideo: VoidFunction;
  stopVideo: VoidFunction;
  isPlaying: boolean;
  onOffVideo: VoidFunction;
  skipTime: (seconds?: number) => void;
  prevTime: (seconds?: number) => void;
  toggleLooping: VoidFunction;
  isLooping: boolean;
  changePlaySpeed: (playSpeed?: number) => void;
  playSpeed: number;
  changeQuality: (index: number) => void;
  getCurrentTime: () => number;
}

export interface FinalOptions extends DefaultOptions {}

export type UseVideo = (
  ref: MutableRefObject<HTMLVideoElement>,
  opt?: Partial<FinalOptions>
) => UseVideoReturnObject;
