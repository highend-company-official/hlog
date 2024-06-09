import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { useSearchStore } from "@/entities/search";
import { useDebounce } from "@/shared";

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setQuery } = useSearchStore();
  const [searchInput, setSearchInput] = useState("");
  const debouncedQuery = useDebounce(searchInput, 300);

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <header className="flex w-full px-4">
      <form
        className="flex items-center justify-center w-full text-black"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="search-bar">
          <FaSearch size={24} />
        </label>
        <input
          ref={inputRef}
          id="search-bar"
          autoComplete="off"
          className="w-full h-[3.5rem] focus:outline-none pl-3 pr-4 text-lg min-w-0"
          type="text"
          value={searchInput}
          onChange={handleChangeSearchInput}
        />
      </form>
    </header>
  );
};

export default SearchBar;
