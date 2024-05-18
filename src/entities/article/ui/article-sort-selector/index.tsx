import React, { useRef, useState } from "react";

import { IoMdTrendingUp } from "react-icons/io";
import { PiSortDescendingLight, PiSortAscendingLight } from "react-icons/pi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { Dropdown, useOutsideClick } from "@/shared";

enum SortType {
  trend = "trend",
  old = "old",
  new = "new",
}

const SortItem = ({
  sortType,
  icon,
}: {
  icon: React.ReactNode;
  sortType: string;
}) => (
  <div className="flex items-center justify-start">
    <div className="mr-3">{icon}</div>
    <div className="mr-1">정렬 기준 :</div>
    <span className="font-bold text-primary">{sortType}</span>
  </div>
);

const CustomDropdownTrigger = ({ label }: { label: React.ReactNode }) => {
  const [isOpen, setIsOpen] = Dropdown.useDropdownContext();

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className="select-none items-center bg-gray-50 border-2 border-solid border-primary text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer flex w-[200px] p-2.5 hover:bg-black/10 transition ease-in-out h-[48px]"
    >
      {label}

      <div className="ml-auto">
        {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </div>
    </div>
  );
};

const ArticleSortSelector = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [sortType, setSortType] = useState<SortType>(SortType.trend);

  const SORT_MAP = {
    trend: <SortItem icon={<IoMdTrendingUp />} sortType="트렌드" />,
    new: <SortItem icon={<PiSortDescendingLight />} sortType="최신 순" />,
    old: <SortItem icon={<PiSortAscendingLight />} sortType="오래된 순" />,
  };

  const handleClickItem = (nextSortType: SortType) => {
    setSortType(nextSortType);
  };

  const handleDetectOutsideClick = () => {};

  useOutsideClick(dropdownRef, handleDetectOutsideClick);

  return (
    <Dropdown>
      <CustomDropdownTrigger label={SORT_MAP[sortType]} />
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
