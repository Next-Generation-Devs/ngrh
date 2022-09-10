import { useCallback, useEffect, useState } from "react";
import { getDefaultOptions } from "./helpers/config";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.useVideo}
 */

export const useVideo = (ref, opt = {}) => {
  const defaultOptions = getDefaultOptions();
  const options = Object.assign({}, defaultOptions, opt);
  const { initialPlaySpeed, initialStartTime, stopAt, pauseAt } = options;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);

  const playVideo = useCallback(() => {
    setIsPlaying(true);
    ref.current.play();
  }, []);

  const pauseVideo = useCallback(() => {
    setIsPlaying(false);
    ref.current.pause();
  }, []);

  const stopVideo = useCallback(() => {
    pauseVideo();
    ref.current.currentTime = 0;
  }, []);

  const onOffVideo = useCallback(() => {
    if (isPlaying) {
      return pauseVideo();
    }
    playVideo();
  }, [isPlaying]);

  const skipTime = useCallback((seconds = 5) => {
    ref.current.currentTime += seconds;
  }, []);

  const toggleLooping = useCallback(() => {
    ref.current.loop = !isLooping;
    setIsLooping(!isLooping);
  }, [isLooping]);

  const changePlaySpeed = useCallback((playSpeed = 1) => {
    ref.current.playbackRate = playSpeed;
    setPlaySpeed(playSpeed);
  }, []);

  const changeQuality = useCallback((index) => {
    const newSource = ref.current.childNodes[index].src;
    ref.current.src = newSource;
  }, []);

  const getCurrentTime = useCallback(() => {
    return ref.current.currentTime;
  }, []);

  const handleStopAt = useCallback(() => {
    if (ref.current.currentTime >= stopAt) {
      stopVideo();
    }
  }, []);

  const handlePauseAt = useCallback(() => {
    if (ref.current.currentTime >= pauseAt) {
      pauseVideo();
    }
  }, []);

  useEffect(() => {
    ref.current.currentTime = initialStartTime;
    changePlaySpeed(initialPlaySpeed);
    setIsPlaying(ref.current.autoplay && ref.current.muted);
    if (stopAt > 0) {
      ref.current.addEventListener("timeupdate", handleStopAt);
    } else if (pauseAt > 0) {
      ref.current.addEventListener("timeupdate", handlePauseAt);
    }
    return () => {
      if (stopAt > 0) {
        ref.current.removeEventListener("timeupdate", handleStopAt);
      } else if (pauseAt > 0) {
        ref.current.removeEventListener("timeupdate", handlePauseAt);
      }
    };
  }, []);

  return {
    playVideo,
    pauseVideo,
    stopVideo,
    isPlaying,
    onOffVideo,
    skipTime,
    toggleLooping,
    isLooping,
    changePlaySpeed,
    playSpeed,
    changeQuality,
    getCurrentTime,
  };
};
