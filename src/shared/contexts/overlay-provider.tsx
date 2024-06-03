import React, { PropsWithChildren, useCallback, useState } from "react";
import { Portal } from "..";

export type ContextType = {
  mount: (id: string, element: React.ReactNode | null) => void;
  unmount: (id: string) => void;
};

export const OverlayContext = React.createContext<ContextType | null>(null);

export const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlayMap, setOverlayMap] = useState<Map<string, React.ReactNode>>(
    new Map()
  );

  const mount: ContextType["mount"] = useCallback((id, element) => {
    setOverlayMap((prevOverlayMap) => {
      const clone = new Map(prevOverlayMap);
      clone.set(id, element);
      return clone;
    });
  }, []);

  const unmount: ContextType["unmount"] = useCallback((id) => {
    setOverlayMap((prevOverlayMap) => {
      const clone = new Map(prevOverlayMap);
      clone.delete(id);
      return clone;
    });
  }, []);

  const context = {
    mount,
    unmount,
  };

  return (
    <OverlayContext.Provider value={context}>
      {children}

      <Portal portalId="overlay-portal">
        {[...overlayMap.entries()].map(([id, element]) => (
          <React.Fragment key={id}>{element}</React.Fragment>
        ))}
      </Portal>
    </OverlayContext.Provider>
  );
};
