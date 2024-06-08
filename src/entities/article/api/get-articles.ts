import { supabase } from "@/shared";

import { SortType } from "../model";
import { ArticleFilterType } from "../query";

type ArticlesResponseType = {
  id: string;
  has_comments: boolean;
  has_hit: boolean;
  has_like: boolean;
  hits: number;
  likes: number;
  created_at: Date;
  profile_url: string;
  summary: string;
  thumbnail: string;
  title: string;
  user_id: string;
  username: string;
};

const getArticles = async (filterType: ArticleFilterType) => {
  let baseQuery = supabase.rpc("get_articles");

  if (filterType.sortType === SortType.new) {
    baseQuery = baseQuery.order("created_at", { ascending: false });
  } else if (filterType.sortType === SortType.old) {
    baseQuery = baseQuery.order("created_at", { ascending: true });
  } else if (filterType.sortType === SortType.trend) {
    baseQuery = baseQuery
      .order("likes", { ascending: false })
      .order("created_at", { ascending: false });
  }

  if (filterType.search) {
    baseQuery = baseQuery.ilike("title", `%${filterType.search}%`);
  }

  if (filterType.categories && filterType.categories.length > 0) {
    const categoryIds = filterType.categories; // 필터에 포함된 카테고리 ID 배열

    // // 카테고리 조인 테이블을 통해 해당 카테고리에 속하는 아티클의 ID를 가져옴
    const categoryArticleIds = await supabase
      .from("article_categories")
      .select("article_id")
      .in("category_id", categoryIds);

    if (categoryArticleIds.data) {
      baseQuery = baseQuery.in(
        "id",
        categoryArticleIds.data?.map((item) => item.article_id)
      );
    }

    // // 가져온 아티클 ID를 이용하여 실제 아티클을 선택하는 필터 추가
  }

  if (filterType.userId) {
    baseQuery = baseQuery.eq("user_id", filterType.userId);
  }

  const response = await baseQuery.returns<ArticlesResponseType[]>();
  return response;
};

export default getArticles;
