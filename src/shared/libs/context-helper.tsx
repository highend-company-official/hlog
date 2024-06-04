import React, { Dispatch, SetStateAction, useContext } from "react";

export type ContextProvideWithState<T> = [T, Dispatch<SetStateAction<T>>];

const useProtectedContext = <T,>(
  context: React.Context<ContextProvideWithState<T> | null>
): ContextProvideWithState<T> => {
  const contextValue = useContext(context);
  if (!contextValue) {
    throw new Error(
      `${context.displayName || "Context"} must be used within its Provider.`
    );
  }
  return contextValue;
};

export default useProtectedContext;
