import { useMutation } from "@tanstack/react-query";
import { type ArticleType, generateRandomId, supabase } from "@/shared";

type Params = {
  articleMetaData: Omit<
    ArticleType,
    "profiles" | "created_at" | "hits" | "verified" | "id" | "thumbnail"
  >;
  thumbnailFile: File;
};

const uploadArticle = async ({
  articleMetaData,
  thumbnailFile,
}: Params): Promise<ArticleType> => {
  const { data } = await supabase.storage
    .from("thumbnails")
    .upload(`thumbnails/${generateRandomId()}`, thumbnailFile, {
      cacheControl: "3600",
      upsert: false,
    });

  const response = await supabase
    .from("articles")
    .insert({
      title: articleMetaData.title,
      thumbnail: data?.path,
      body: articleMetaData.body,
      summary: articleMetaData.summary,
      has_comments: articleMetaData.has_comments,
      has_like: articleMetaData.has_like,
      has_hit: articleMetaData.has_hit,
    })
    .throwOnError()
    .select()
    .throwOnError()
    .single();

  return response.data;
};

const usePostArticle = () =>
  useMutation<ArticleType, Error, Params>({
    mutationFn: uploadArticle,
    onSuccess: () => {},
    onError: () => {},
  });

export default usePostArticle;
