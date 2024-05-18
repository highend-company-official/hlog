import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

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

const createContextProviderWithState = <T,>(defaultValue: T) => {
  const context = createContext<ContextProvideWithState<T> | null>(null);

  const Provider = ({ children }: { children: ReactNode }) => {
    const state = useState<T>(defaultValue);
    return <context.Provider value={state}>{children}</context.Provider>;
  };

  context.displayName = `ContextProvider`;

  return {
    Provider,
    context,
  };
};

export default {
  useProtectedContext,
  createContextProviderWithState,
};
