import React from "react";
import { FaSearch } from "react-icons/fa";

import useSearchStore from "@/entities/search-input/model";

const SearchBar = () => {
  const { searchInput, setSearchInput } = useSearchStore();

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  return (
    <header className="flex w-full px-4">
      <form className="flex items-center justify-center w-full text-black">
        <label htmlFor="search-bar">
          <FaSearch size={24} />
        </label>
        <input
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
