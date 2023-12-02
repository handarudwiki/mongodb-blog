import { createContext, useEffect, useReducer } from "react";
import Reducer from "./reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Perbaikan pada localStorage
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user)); // Perbaikan pada localStorage
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error, // Perbaikan pada nama properti
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
