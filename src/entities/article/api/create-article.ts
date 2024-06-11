import { generateRandomId, supabase } from "@/shared";
import { TablesInsert } from "types/generated-database.types";

type Params = {
  articleMetaData: {
    title: string;
    thumbnail?: File;
    body: string;
    summary: string;
    has_comments: boolean;
    has_like: boolean;
    has_hit: boolean;
    category: TablesInsert<"categories">[];
  };
  thumbnailFile: File;
};

const createArticle = async ({ articleMetaData, thumbnailFile }: Params) => {
  // Upload the thumbnail
  const { data: thumbnailData, error: uploadError } = await supabase.storage
    .from("thumbnails")
    .upload(`${generateRandomId()}`, thumbnailFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  // Insert the article
  const { data: articleData, error: insertError } = await supabase
    .from("articles")
    .insert({
      title: articleMetaData.title,
      thumbnail: thumbnailData?.path,
      body: articleMetaData.body,
      summary: articleMetaData.summary,
      has_comments: articleMetaData.has_comments,
      has_like: articleMetaData.has_like,
      has_hit: articleMetaData.has_hit,
    })
    .select()
    .single();

  if (insertError) {
    throw insertError;
  }

  // Insert categories
  const categoryInserts = articleMetaData.category.map(({ id }) => ({
    article_id: articleData.id,
    category_id: id!,
  }));

  const { error: categoryError } = await supabase
    .from("article_categories")
    .insert(categoryInserts);

  if (categoryError) {
    throw categoryError;
  }

  return articleData;
};

export default createArticle;
