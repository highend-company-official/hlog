import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

import useSearchStore from "@/entities/search-input/model";
import { Portal, useOutsideClick } from "@/shared";

import SearchInput from "./search-input";
import SearchSelector from "./search-selector";

const SearchContainer = () => {
  const { isSearchOpen, setIsSearchOpen, reset } = useSearchStore();
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
                <SearchSelector />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default SearchContainer;
