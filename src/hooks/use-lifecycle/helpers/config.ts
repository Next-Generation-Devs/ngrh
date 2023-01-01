import { GetDefaultFunctions } from "types/useLifecycleTypes";

export const getDefaultFunctions: GetDefaultFunctions = () => {
  return {
    didMount: () => {},
    didUpdate: () => {},
    willUnmount: () => {},
  };
};
