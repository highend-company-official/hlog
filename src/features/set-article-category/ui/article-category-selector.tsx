import { Checkbox } from "@/shared";
import { useArticleStore } from "@/entities/article";

import { useGetCategories } from "@/entities/category";

const ArticleCategorySelector = () => {
  const { data: categories } = useGetCategories();
  const { filter, setFilter } = useArticleStore();

  const selectedValues = filter.categories ?? [];

  const handleChangeCheckbox = (targetValue: string) => {
    if (selectedValues.includes(targetValue)) {
      setFilter({
        categories: selectedValues.filter((value) => value !== targetValue),
        page: 0,
      });
      return;
    }
    setFilter({
      categories: [...selectedValues, targetValue],
      page: 0,
    });
  };

  return (
    <div className="p-4 text-black top-20">
      <h3 className="text-3xl font-bold">카테고리</h3>
      <p className="text-sm">원하는 카테고리를 기반으로 탐색해보세요.</p>

      <div className="mt-3"></div>
      {categories.map(({ id, category }) => {
        return (
          <Checkbox
            id={id}
            key={id}
            onChange={() => handleChangeCheckbox(id)}
            checked={selectedValues.includes(id)}
          >
            {category}
          </Checkbox>
        );
      })}
    </div>
  );
};

export default ArticleCategorySelector;
