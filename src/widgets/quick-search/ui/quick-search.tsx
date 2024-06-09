import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Portal, useOutsideClick } from "@/shared";

import { useSearchStore } from "@/entities/search";

import { SearchInput } from ".";
import SearchSelector from "./search-selector";
import classNames from "classnames";

const buttonClassName = (isActive: boolean) =>
  classNames("b-2 flex-1 w-full h-full p-4 transition ease-in-out", {
    "border-primary border-solid border-b-4": isActive,
  });

const QuickSearch = () => {
  const { isSearchOpen, setIsSearchOpen, reset, mode, setMode } =
    useSearchStore();
  const overlayRef = useRef(null);

  const handleClose = () => {
    reset();
    setIsSearchOpen(false);
  };

  useOutsideClick(overlayRef, handleClose);

  return (
    <Portal portalId="search-portal">
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            layout
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.1,
            }}
            className="fixed top-0 left-0 z-50 w-full h-screen overflow-hidden backdrop-blur-md bg-black/30"
          >
            <div
              className="absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              ref={overlayRef}
            >
              <motion.div
                className="w-[500px] bg-white rounded-md max-w-[47rem] shadow-lg"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SearchInput />

                <nav className="w-full p-4 flex">
                  <button
                    className={buttonClassName(mode === "article")}
                    onClick={() => setMode("article")}
                  >
                    아티클
                  </button>
                  <button
                    className={buttonClassName(mode === "profile")}
                    onClick={() => setMode("profile")}
                  >
                    프로필
                  </button>
                </nav>

                <SearchSelector />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default QuickSearch;
