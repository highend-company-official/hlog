import classNames from "classnames";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { Tables } from "types/generated-database.types";

import { useEditorStore } from "@/entities/article";
import { useGetCategories } from "@/entities/category";
import { Blockquote } from "@/shared";

const CategoryPart = () => {
  const { editorMetaData, setEditorMetaData } = useEditorStore();
  const { data } = useGetCategories();

  const handleAddCategory = (
    newCategory: Omit<Tables<"categories">, "created_at">
  ) => {
    setEditorMetaData({
      ...editorMetaData,
      category: [...editorMetaData.category, newCategory],
    });
  };

  const handleRemoveCategory = (id: string) => {
    setEditorMetaData({
      ...editorMetaData,
      category: editorMetaData.category.filter((c) => c.id !== id),
    });
  };

  if (!data) return null;

  return (
    <>
      {editorMetaData.category.length > 0 && (
        <Blockquote>
          <h4 className="font-bold">선택된 카테고리</h4>

          <div className="flex flex-wrap">
            {editorMetaData.category.map((categoryData) => (
              <div
                className="px-1 py-1 mr-1 mt-1 rounded-md bg-primary/70 text-white flex"
                key={categoryData.id}
              >
                {categoryData.category}
                <button type="button">
                  <IoClose
                    onClick={() => handleRemoveCategory(categoryData.id!)}
                    className="ml-1"
                  />
                </button>
              </div>
            ))}
          </div>
        </Blockquote>
      )}

      {data.map((categoryData) => {
        const hasCategory = editorMetaData.category
          .map(({ id }) => id)
          .includes(categoryData.id);

        return (
          <div
            className={classNames(
              "flex items-center p-4 text-sm w-full hover:text-primary hover:bg-black/10 cursor-pointer transition ease-in-out rounded-md",
              { "text-primary font-semibold": hasCategory }
            )}
            key={categoryData.id}
            onClick={() =>
              hasCategory
                ? handleRemoveCategory(categoryData.id)
                : handleAddCategory(categoryData)
            }
          >
            {hasCategory && <FaCheck className="mr-3" size={10} />}
            {categoryData.category}
          </div>
        );
      })}
    </>
  );
};

export default CategoryPart;
