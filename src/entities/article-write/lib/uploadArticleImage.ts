import { supabase } from "@/shared";

const uploadArticleImage = async (
  path: string,
  file: File,
  successCb: (url: string) => void,
  errorCb: (error: string) => void
) => {
  try {
    const { data, error } = await supabase.storage
      .from("articles")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    const generatedPath = data?.path;

    if (path) {
      successCb(generatedPath ?? "");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    errorCb(error.message);
  }
};

export default uploadArticleImage;
