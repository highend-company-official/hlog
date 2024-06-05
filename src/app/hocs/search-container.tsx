import React from "react";

import { QuickSearch } from "@/widgets/quick-search";

type Props = {
  children: React.ReactNode;
};

const SearchContainer = ({ children }: Props) => {
  return (
    <>
      {children}
      <QuickSearch />
    </>
  );
};

export default SearchContainer;
