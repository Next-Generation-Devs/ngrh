# The use-click-outside hook đ

A hook to provide utilities for the html5 video element.

## Usage âī¸

The hook take two params â¨:

- `ref` đĒ: the ref of the element to check if clicked outside of it.
- `options` âī¸: options contains two functions to call on click outside:
- - `initialPlaySpeed`: the initial play speed of the video (_defaults to 1_).
- - `initialStartTime`: the initial start time of the video in seconds (_defaults to 0_).
- - `stopAt`: a time to auto stop the video at (_defaults to 0_).
- - `pauseAt`: a time to auto pause the video at (_defaults to 0_).

The hook returns a lot of utilities for the video:

- `playVideo` âļī¸: a function to start the video.
- `pauseVideo` â¸ī¸: a function to pause the video.
- `stopVideo` âšī¸: a function to stop the video.
- `onOffVideo` â¯ī¸: a function to toggle the video on and off.
- `toggleLooping` đ: a function to toggle the video loop attribute.
- `skipTime` â­ī¸: a function to skip specific amount of time in the video. Takes one parameter:
- - `seconds`: amount of seconds to skip (_defaults to 5 seconds_).
- `prevTime` â­ī¸: a function to go back a specific amount of time in the video. Takes one parameter:
- - `seconds`: amount of seconds to go back (_defaults to 5 seconds_).
- `changePlaySpeed` âĢ: a function to change the playspeed of the video. Takes one parameter:
- - `playSpeed`: the speed of the video (_defaults to 1_).
- `changeQuality` đŊī¸: a function to change the quality of the video based on the given "sources" to the video. Takes one parameter:
- - `index`: the index of the `<source>` holdes the selected quality.
- `getCurrentTime` â: a function to get the current time of the video. Return the time of the video in seconds.
- `isPlaying` đ: a state to check if the video is playing.
- `isLooping` đ: a state to check if the video is looping.
- `playSpeed` đââī¸: a state for the playspeed of the video.

## Examples đĨ

Using the hook to create your own custom video controllers đŽ:

```js
import useVideo from "ngrh/use-video";
import * as React from "react";

const Page = () => {
  const ref = React.useRef();

  const { onOffVideo, stopVideo, changeQuality, skipTime, prevTime } =
    useVideo(ref);

  return (
    <div>
      <button onClick={onOffVideo}>On/Off</button>
      <button onClick={stopVideo}>Stop & Reset</button>
      <button onClick={skipTime}>Skip 5 Sec</button>
      <button onClick={prevTime}>Go back 5 Sec</button>
      <button onClick={() => changeQuality(1)}>change to "HD"</button>
      <video ref={ref}>
        <source src="SOME_SOURCE_FHD" />
        <source src="SOME_SOURCE_HD" />
      </video>
    </div>
  );
};
```

## License â

MIT
