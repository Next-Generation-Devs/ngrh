import { getDefaultFunctions } from "./helpers/config";
import { useEffect, useRef } from "react";

import type { UseLifecycle } from "types/useLifecycleTypes";

export const useLifecycle: UseLifecycle = (funcs = {}, conditions = []) => {
  const defaultFunctions = getDefaultFunctions();
  const functions = Object.assign({}, defaultFunctions, funcs);
  const isMounted = useRef<boolean>(false);
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
