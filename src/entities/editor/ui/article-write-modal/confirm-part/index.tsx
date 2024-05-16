import { useEditorStore } from "@/app/store";
import { ArticleCard } from "@/entities/article";
import { useFetchUser, useSession } from "@/shared";

const ConfirmPart = () => {
  const { editorMetaData } = useEditorStore();
  const { data } = useSession();

  const userId = data.session?.user.id;
  const { data: userData } = useFetchUser(userId!);

  return (
    <>
      <span>거의 다 왔습니다.</span>

      <ArticleCard
        body=""
        created_at={new Date()}
        viewMode="card"
        has_comments={editorMetaData.hasComment}
        hits={0}
        thumbnail={URL.createObjectURL(editorMetaData.thumbnail!)}
        title={editorMetaData.title}
        summary={editorMetaData.summary}
        verified={false}
        id="#"
        profiles={{
          profile_url: userData?.profile_url ?? "",
          username: userData?.username ?? "",
        }}
      />
    </>
  );
};

export default ConfirmPart;
