# The use-click-outside hook 🚀

A hook to provide utilities for the html5 video element.

## Usage ⚒️

The hook take two params ✨:

- `ref` 🪝: the ref of the element to check if clicked outside of it.
- `options` ⚙️: options contains two functions to call on click outside:
- - `initialPlaySpeed`: the initial play speed of the video (_defaults to 1_).
- - `initialStartTime`: the initial start time of the video in seconds (_defaults to 0_).
- - `stopAt`: a time to auto stop the video at (_defaults to 0_).
- - `pauseAt`: a time to auto pause the video at (_defaults to 0_).

The hook returns a lot of utilities for the video:

- `playVideo` ▶️: a function to start the video.
- `pauseVideo` ⏸️: a function to pause the video.
- `stopVideo` ⏹️: a function to stop the video.
- `onOffVideo` ⏯️: a function to toggle the video on and off.
- `toggleLooping` 🔁: a function to toggle the video loop attribute.
- `skipTime` ⏭️: a function to skip specific amount of time in the video. Takes one parameter:
- - `seconds`: amount of seconds to skip (_defaults to 5 seconds_).
- `prevTime` ⏭️: a function to go back a specific amount of time in the video. Takes one parameter:
- - `seconds`: amount of seconds to go back (_defaults to 5 seconds_).
- `changePlaySpeed` ⏫: a function to change the playspeed of the video. Takes one parameter:
- - `playSpeed`: the speed of the video (_defaults to 1_).
- `changeQuality` 📽️: a function to change the quality of the video based on the given "sources" to the video. Takes one parameter:
- - `index`: the index of the `<source>` holdes the selected quality.
- `getCurrentTime` ⌛: a function to get the current time of the video. Return the time of the video in seconds.
- `isPlaying` 🔛: a state to check if the video is playing.
- `isLooping` 🔁: a state to check if the video is looping.
- `playSpeed` 🏃‍♂️: a state for the playspeed of the video.

## Examples 💥

Using the hook to create your own custom video controllers 🎮:

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

## License ✅

MIT
