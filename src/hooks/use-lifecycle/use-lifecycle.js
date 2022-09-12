import { getDefaultFunctions } from "./helpers/config";
import { useEffect, useRef } from "react";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.useLifecycle}
 */

export const useLifecycle = (funcs = {}, conditions = []) => {
  const defaultFunctions = getDefaultFunctions();
  const functions = Object.assign({}, defaultFunctions, funcs);
  const isMounted = useRef(false);
  const { didMount, didUpdate, willUnmount } = functions;

  useEffect(() => {
    return didUpdate;
  }, conditions);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }
    didMount();
    return () => {
      willUnmount();
    };
  }, []);
};
