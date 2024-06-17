import { useEditorStore } from "@/entities/article";
import { useEditorUtils } from "@/widgets/editor";

const Row = ({ target, value }: { target: string; value: string | number }) => (
  <tr className="bg-white border-b">
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
    >
      {target}
    </th>
    <td className="px-6 py-4 font-bold break-all text-wrap">{value}</td>
  </tr>
);

const PreviewPart = () => {
  const { editorMetaData, content } = useEditorStore();
  const { getPlaneTextLength } = useEditorUtils();

  return (
    <>
      <span className="inline-block mb-3 font-bold">
        설정한 내용을 확인해보세요.
      </span>

      <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
        <thead className="text-xs text-white uppercase bg-primary/80">
          <tr>
            <th scope="col" className="px-6 py-3">
              타겟
            </th>
            <th scope="col" className="px-6 py-3">
              내용
            </th>
          </tr>
        </thead>
        <tbody>
          <Row target="아티클 제목" value={editorMetaData.title} />
          <Row
            target="아티클 요약"
            value={
              editorMetaData.summary.trim() ? editorMetaData.summary : "없음"
            }
          />
          <Row
            target="아티클 글 수"
            value={`${getPlaneTextLength(content.getCurrentContent())} 자`}
          />
          <Row
            target="카테고리"
            value={
              editorMetaData.category.length > 0
                ? editorMetaData.category
                    .map(({ category }) => category)
                    .join(", ")
                : "없음"
            }
          />
          <Row
            target="댓글 포함 여부"
            value={editorMetaData.hasComment ? "포함" : "미포함"}
          />
          <Row
            target="좋아요 포함 여부"
            value={editorMetaData.hasLike ? "포함" : "미포함"}
          />
          <Row
            target="조회수 포함 여부"
            value={editorMetaData.hasHit ? "포함" : "미포함"}
          />
        </tbody>
      </table>
    </>
  );
};

export default PreviewPart;
