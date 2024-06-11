import React from "react";

import { QuickSearch } from "@/widgets/quick-search";
import { QueryBoundary } from "@/shared";

type Props = {
  children: React.ReactNode;
};

const SearchContainer = ({ children }: Props) => {
  return (
    <QueryBoundary>
      {children}
      <QuickSearch />
    </QueryBoundary>
  );
};

export default SearchContainer;
