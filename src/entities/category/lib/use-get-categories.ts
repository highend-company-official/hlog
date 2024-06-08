import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategories } from "@/entities/category";

const useGetCategories = () => {
  const queryKey = ["category"] as const;
  const queryFn = async () => {
    const response = await getCategories();

    if (response.data === null) return [];

    return response.data;
  };

  return useSuspenseQuery({
    queryKey,
    queryFn,
  });
};

export default useGetCategories;
