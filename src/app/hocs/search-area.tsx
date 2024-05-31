import { SearchContainer } from "@/features/search/ui";
import React from "react";

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
