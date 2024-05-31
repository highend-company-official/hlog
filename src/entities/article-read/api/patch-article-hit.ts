import { supabase } from "@/shared";

const patchArticleHits = (articleId: string) =>
  supabase.rpc("increment_article_hits", { article_id: articleId });

export default patchArticleHits;
