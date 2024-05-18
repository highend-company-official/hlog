import { Dropdown } from "@/shared";
import { useEffect, useState } from "react";

enum SortType {
  trend = "trend",
  old = "old",
  new = "new",
}

const SORT_MAP = {
  trend: "트렌드",
  old: "오래된 순",
  new: "최신 순",
};

const ArticleSortSelector = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.trend);

  const handleClickItem = (nextSortType: SortType) => {
    setSortType(nextSortType);
  };

  useEffect(() => {
    console.log(sortType); // Refetch Query
  }, [sortType]);

  return (
    <Dropdown>
      <Dropdown.Trigger>Hello world</Dropdown.Trigger>
      <Dropdown.Menu>
        {Object.entries(SORT_MAP).map(([key, value]) => {
          return (
            <Dropdown.Item value={key as SortType} onClick={handleClickItem}>
              {value}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ArticleSortSelector;
