import { supabase } from ".";

const useBucket = (bucketName: string, url: string) => {
  const data = supabase.storage.from(bucketName).getPublicUrl(url);

  return data.data.publicUrl;
};

export default useBucket;
