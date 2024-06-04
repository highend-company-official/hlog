import React from "react";
import { SearchContainer } from "@/features/search/ui";

type Props = {
  children: React.ReactNode;
};

const SearchArea = ({ children }: Props) => {
  return (
    <>
      {children}
      <SearchContainer />
    </>
  );
};

export default SearchArea;
