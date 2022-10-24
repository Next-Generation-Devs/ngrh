import { GetDefaultOptions } from "types/useVideoTypes";

export const getDefaultOptions: GetDefaultOptions = () => {
  return {
    initialPlaySpeed: 1,
    initialStartTime: 0,
    stopAt: 0,
    pauseAt: 0,
  };
};
