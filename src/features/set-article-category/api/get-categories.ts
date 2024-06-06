import { CategoryType, supabase } from "@/shared";

const getCategories = () => {
  return supabase
    .from("categories")
    .select("id, category")
    .throwOnError()
    .returns<CategoryType[]>();
};

export default getCategories;
