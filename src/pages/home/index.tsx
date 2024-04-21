import { useQuery } from "@tanstack/react-query";
import { ArticleCard } from "@/entities/article";
import * as shared from "@/shared";

const getArticles = () =>
  shared.supabase.from("articles").select(`
    id,
    title,
    body,
    summary,
    hits,
    thumbnail,
    created_at,
    updated_at,
    users (username)
  `);

function HomePage() {
  const { data, isFetching } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  if (isFetching) {
    return <>Loading</>;
  }

  console.log(data);

  return (
    <div className="w-full">
      {data.data?.map((articleData: shared.Article) => (
        <ArticleCard
          id={articleData.id}
          updatedAt=""
          key={articleData.id}
          title={articleData.title}
          body={articleData.body}
          createdAt={articleData.createdAt}
          hits={articleData.hits}
          like={[]}
          summary={articleData.summary}
          username={articleData.username}
          thumbnail={articleData.thumbnail}
          verified={articleData.verified}
        />
      ))}
    </div>
  );
}

export default HomePage;
