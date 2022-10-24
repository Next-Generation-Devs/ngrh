import { MutableRefObject } from "react";

export interface DefaultOptions {
  /** when the search type is "path" and you want to get the value of the path set this prop to true. Otherwise the results will be the paths of the values (_defaults to false_). */ parsePaths: boolean;
  /** if you want to get the whole object that contains a match then set this to false. If set to true then it will return only the props that match the given query and delete the other props (_defaults to false_). */ strictFilter: boolean;
  /** the type of the search can be ("filter","check","path") (_defaults to "filter"_). */ searchType: string;
}

export type GetDefaultOptions = () => DefaultOptions;

export type GetType = (source: any) => "array" | "object" | "primitive" | null;

export type GetByPath = <T>(
  /** an array or object to get the value from by the given path. */ obj: Object,
  /** the path you want to get it's value. */ path: string
) => T;

export type Contains = (source: any, query: string) => boolean | null;

export type FilterSearch = <T = any>(
  source: any,
  query: string,
  strictFilter?: boolean
) => T;

export type FindPath<T = any> = (
  source: any,
  query: string,
  parsePaths?: boolean
) => Array<string | T> | null;

export interface UseSearchReturnObject<T> {
  /** the ref to set on the input that represents the search bar. */ ref: MutableRefObject<
    HTMLInputElement | undefined
  >;
  /** the query written inside the input with the given ref. */ query: string;
  /** the result of the search. */ result: T;
}

export interface FinalOptions extends DefaultOptions {}

export type UseSearch<T = any> = (
  /** the source want to be searched. */ source: any,
  /** the options of the search. */ opt?: Partial<FinalOptions>
) => UseSearchReturnObject<T>;
