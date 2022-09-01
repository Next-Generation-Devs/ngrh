/* eslint-disable no-unused-vars */
import { RefObject } from "react";

/**
 * @typedef {Object} ReturnObject
 * @prop {RefObject} ref - the ref to set on the input that represents the search bar.
 * @prop {string} query - the query written inside the input with the given ref.
 * @prop {any} result - the result of the search.
 */

/**
 * @typedef {Object} DefaultOptions
 * @prop {false} parsePaths
 * @prop {false} strictFilter
 * @prop {'filter'} searchType
 */

/**
 * @callback GetDefaultOptions
 * @return {DefaultOptions}
 */

/**
 * @typedef {Object} Options
 * @prop {boolean} [parsePaths] - when the search type is "path" and you want to get the value of the path set this prop to true. Otherwise the results will be the paths of the values (_defaults to false_).
 * @prop {boolean} [strictFilter] - if you want to get the whole object that contains a match then set this to false. If set to true then it will return only the props that match the given query and delete the other props (_defaults to false_).
 * @prop {('filter' | 'check' | 'path')} [searchType] - the type of the search can be ("filter","check","path") (_defaults to "filter"_).
 */

/**
 * @callback useSearch
 * @param {any} source - the source want to be searched.
 * @param {Options} options - the options of the search.
 * @return {ReturnObject}
 */

/**t
 * @callback GetByPath
 * @param {Array | Object} obj - an array or object to get the value from by the given path.
 * @param path - the path you want to get it's value.
 * @return {any} - the value of the path
 */

/**
 * @callback Contains
 * @param source - the source to check if it's contain the given query or not.
 * @param query - the query of the search.
 * @return {boolean} - if the given source conains the query returns true otherwise returns false.
 */

/**
 * @callback FilterSearch
 * @param {any} source - the source to filter upon the query.
 * @param {string} query - the query of the search.
 * @param {boolean} [strictFilter] - if true then all the props that don't match the query will be removed otherwise the whole object that contains a single prop matches the query will be picked (_defaults to false_).
 * @return {any} - the filtered source.
 */

/**
 * @callback FindPath
 * @param {any} source - the source to find the path from depending on the query.
 * @param {string} query - the query of the search.
 * @param {boolean} [parsePaths] - a boolean to decide if the result will be the paths itself or the value of that paths (_defaults to false_).
 * @return {Array<any>} - if the parse path option is true then this will be an array of the values of the paths otherwise it will be array of the paths.
 */

export {};
