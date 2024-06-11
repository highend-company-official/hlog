import { supabase } from "@/shared";
import { EditorMetaData } from "../model";

const editArticle = async (
  articleId: string,
  articleMetaData: EditorMetaData & { content: string }
) => {
  const { content, hasComment, hasHit, hasLike, summary, title, category } =
    articleMetaData;

  // Update the article
  const { data: articleData, error: updateError } = await supabase
    .from("articles")
    .update({
      body: content,
      has_hit: hasHit,
      has_comments: hasComment,
      has_like: hasLike,
      summary,
      title,
    })
    .eq("id", articleId)
    .select()
    .single();

  if (updateError) throw updateError;

  // Delete existing categories
  const { error: deleteError } = await supabase
    .from("article_categories")
    .delete()
    .eq("article_id", articleId);

  if (deleteError) throw deleteError;

  // Insert new categories
  const categoryInserts = category.map(({ id: categoryId }) => ({
    article_id: articleId,
    category_id: categoryId!,
  }));

  const { error: categoryError } = await supabase
    .from("article_categories")
    .insert(categoryInserts);

  if (categoryError) throw categoryError;

  return articleData;
};

export default editArticle;
