import { Checkbox } from "@/shared";

const CATEGORY_LIST = [
  "Frontend",
  "React",
  "Server",
  "Supabase",
  "Damzzling",
  "ETC",
];

const ArticleCategorySelector = () => {
  return (
    <div className="sticky top-20 p-4 text-black">
      <h3 className="text-xl font-bold">Category</h3>
      <p className="text-sm">원하는 카테고리를 기반으로 탐색해보세요.</p>

      <div className="mt-3"></div>
      {CATEGORY_LIST.map((category) => (
        <Checkbox key={category}>{category}</Checkbox>
      ))}
    </div>
  );
};

export default ArticleCategorySelector;
