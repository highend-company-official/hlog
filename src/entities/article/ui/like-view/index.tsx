import * as shared from "@/shared";
import { BiSolidLike } from "react-icons/bi";

const LiveView = () => {
  return (
    <div className="flex items-center flex-col justify-center py-6 mt-6">
      <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
        게시글이 마음에 드셨나요?
      </h5>
      <p className="mb-3 font-normal text-gray-700">
        좋아요를 눌러서 글 검증에 도움을 주세요!
      </p>
      <shared.Button className="flex justify-center w-32">
        <BiSolidLike className="mr-1" />
        좋아요
      </shared.Button>
    </div>
  );
};

export default LiveView;
