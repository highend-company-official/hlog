import { RawDraftContentState } from "draft-js";
import { generateRandomId, supabase } from "@/shared";

type Params = {
  articleMetaData: {
    title: string;
    thumbnail?: File;
    body: RawDraftContentState;
    summary: string;
    has_comments: boolean;
    has_like: boolean;
    has_hit: boolean;
  };
  thumbnailFile: File;
};

const createArticle = async ({ articleMetaData, thumbnailFile }: Params) => {
  const { data: thumbnailData } = await supabase.storage
    .from("thumbnails")
    .upload(`${generateRandomId()}`, thumbnailFile, {
      cacheControl: "3600",
      upsert: false,
    });

  const response = await supabase
    .from("articles")
    .insert({
      title: articleMetaData.title,
      thumbnail: thumbnailData?.path,
      body: JSON.stringify(articleMetaData.body),
      summary: articleMetaData.summary,
      has_comments: articleMetaData.has_comments,
      has_like: articleMetaData.has_like,
      has_hit: articleMetaData.has_hit,
    })
    .throwOnError()
    .select()
    .throwOnError()
    .single();

  const { data, error } = response;

  if (error) {
    throw error;
  }

  return data;
};

export default createArticle;
