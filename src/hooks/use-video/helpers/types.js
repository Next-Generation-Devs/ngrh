/* eslint-disable no-unused-vars */
import { RefObject } from "react";

/**
 * @typedef {Object} DefaultOptions
 * @prop {1} initialPlaySpeed
 * @prop {0} initialStartTime
 * @prop {0} stopAt
 * @prop {0} pauseAt
 */

/**
 * @callback GetDefaultOptions
 * @return {DefaultOptions}
 */

/**
 * @typedef {Object} Options
 * @prop {number} initialPlaySpeed - the initial play speed of the video (_defaults to 1_).
 * @prop {number} initialStartTime - the initial start time of the video in seconds (_defaults to 0_).
 * @prop {number} stopAt - a time to auto stop the video at (_defaults to 0_).
 * @prop {number} pauseAt - a time to auto pause the video at (_defaults to 0_).
 */

/**
 * @callback ChangeQuality
 * @param {number} index - the index of the `<source>` holdes the selected quality.
 */

/**
 * @callback GetCurrentTime
 * @return {number}
 */

/**
 * @callback ChangePlaySpeed
 * @param {number} [playSpeed] - the speed of the video (_defaults to 1_).
 */

/**
 * @callback SkipTime
 * @param {number} [seconds] - amount of seconds to skip (_defaults to 5 seconds_).
 */

/**
 * @callback PrevTime
 * @param {number} [seconds] - amount of seconds to go back (_defaults to 5 seconds_).
 */

/**
 * @typedef {Object} ReturnObject
 * @prop {VoidFunction} playVideo  - a function to start the video.
 * @prop {VoidFunction} pauseVideo  - a function to pause the video.
 * @prop {VoidFunction} stopVideo  - a function to stop the video.
 * @prop {VoidFunction} onOffVideo  - a function to toggle the video on and off.
 * @prop {VoidFunction} toggleLooping  - a function to toggle the video loop attribute.
 * @prop {SkipTime} skipTime  - a function to skip specific amount of time in the video.
 * @prop {PrevTime} prevTime  - a function to go back a specific amount of time in the video.
 * @prop {ChangePlaySpeed} changePlaySpeed  - a function to change the playspeed of the video.
 * @prop {ChangeQuality} changeQuality  - a function to change the quality of the video based on the given "sources" to the video.
 * @prop {GetCurrentTime} getCurrentTime  - a function to get the current time of the video.
 * @prop {boolean} isPlaying  - a state to check if the video is playing.
 * @prop {boolean} isLooping  - a state to check if the video is looping.
 * @prop {number} playSpeed  - a state for the playspeed of the video.
 */

/**
 * @callback useVideo
 * @param {RefObject<HTMLVideoElement>} ref - the ref to the video element.
 * @param {Options} options - the options of the video.
 * @return {ReturnObject}
 */

export {};
