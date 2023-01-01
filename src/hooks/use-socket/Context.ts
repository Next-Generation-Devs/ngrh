import { createContext } from "react";
import { UseSocketReturnObject } from "types/useSocketTypes";

const SocketContext = createContext({} as UseSocketReturnObject);

export default SocketContext;
