import { useCallback, useEffect, useState } from "react";
import { UseVideo, UseVideoReturnObject } from "types/useVideoTypes";
import { getDefaultOptions } from "./helpers/config";

export const useVideo: UseVideo = (ref, opt = {}) => {
  const defaultOptions = getDefaultOptions();
  const options = {
    ...defaultOptions,
    ...opt,
  };
  const { initialPlaySpeed, initialStartTime, stopAt, pauseAt } = options;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);

  const playVideo: UseVideoReturnObject["playVideo"] = useCallback(() => {
    setIsPlaying(true);
    ref.current.play();
  }, []);

  const pauseVideo: UseVideoReturnObject["pauseVideo"] = useCallback(() => {
    setIsPlaying(false);
    ref.current.pause();
  }, []);

  const stopVideo: UseVideoReturnObject["stopVideo"] = useCallback(() => {
    pauseVideo();
    ref.current.currentTime = 0;
  }, []);

  const getCurrentTime: UseVideoReturnObject["getCurrentTime"] =
    useCallback(() => {
      return ref.current.currentTime;
    }, []);

  const onOffVideo: UseVideoReturnObject["onOffVideo"] = useCallback(() => {
    if (isPlaying) {
      pauseVideo();
      return;
    }
    playVideo();
  }, [isPlaying]);

  const skipTime: UseVideoReturnObject["skipTime"] = useCallback(
    (seconds = 5) => {
      ref.current.currentTime += seconds;
    },
    []
  );

  const prevTime: UseVideoReturnObject["prevTime"] = useCallback(
    (seconds = 5) => {
      const { currentTime } = ref.current;
      if (currentTime - seconds > 0) ref.current.currentTime -= seconds;
      else ref.current.currentTime = 0;
    },
    []
  );

  const toggleLooping: UseVideoReturnObject["toggleLooping"] =
    useCallback(() => {
      ref.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }, [isLooping]);

  const changePlaySpeed: UseVideoReturnObject["changePlaySpeed"] = useCallback(
    (playSpeed = 1) => {
      ref.current.playbackRate = playSpeed;
      setPlaySpeed(playSpeed);
    },
    []
  );

  const changeQuality: UseVideoReturnObject["changeQuality"] = useCallback(
    (index) => {
      const time = getCurrentTime();
      const newSource = (ref.current.childNodes[index] as HTMLSourceElement)
        .src;
      ref.current.src = newSource;
      if (isPlaying) {
        playVideo();
        ref.current.currentTime = time;
      }
    },
    [isPlaying]
  );

  const handleStopAt = useCallback(() => {
    if (ref.current.currentTime >= stopAt) {
      stopVideo();
    }
  }, [stopAt]);

  const handlePauseAt = useCallback(() => {
    if (ref.current.currentTime >= pauseAt) {
      pauseVideo();
    }
  }, [pauseAt]);

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
    prevTime,
  };
};
