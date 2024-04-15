import { useEffect } from "react";
import { BiSolidLike } from "react-icons/bi";

import * as shared from "@/shared";

function ArticleRead() {
  const { scrollToTop } = shared.useScrollToTop();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      {/* Article Area */}
      <img
        src={shared.MOCK_DATA.thumbnail}
        alt={shared.MOCK_DATA.summary}
        className="rounded-xl mt-9 w-full h-96 object-cover"
      />
      <h3 className="mt-4 text-5xl break-keep break-words">
        {shared.MOCK_DATA.title}
      </h3>
      <span className="text-subTitle pt-4">{shared.MOCK_DATA.summary}</span>

      <section className="flex mt-5">
        <img
          src={shared.MOCK_DATA.user.profileUrl}
          alt={shared.MOCK_DATA.user.username}
          className="w-12 h-12 mr-3 rounded-full"
        />
        <div className="flex items-center justify-center">
          <span className="font-bold">{shared.MOCK_DATA.user.username}</span>
          <span className="ml-2 font-thin">{shared.MOCK_DATA.createdAt}</span>
        </div>
      </section>

      <div className="mt-9 text-base leading-6">{shared.MOCK_DATA.body}</div>

      {/* Like Area */}
      <div className="flex items-center flex-col justify-center py-6 mt-6">
        <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          게시글이 마음에 드셨나요?
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">
          좋아요를 눌러서 글 검증에 도움을 주세요!
        </p>
        <shared.Button className="flex justify-center w-32">
          <BiSolidLike className="mr-1" />
          좋아요
        </shared.Button>
      </div>

      <div className="flex items-center">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="px-3 text-gray-500">Comment</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Comment Area */}
      <form className="bg-white rounded-lg border p-2 mx-auto mt-10">
        <div className="mb-2 mt-2">
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-4 outline-none"
            placeholder="댓글을 입력해주세요..."
          ></textarea>
        </div>
        <shared.Button
          type="submit"
          className="py-1.5 rounded-md text-white text-sm"
        >
          Comment
        </shared.Button>
      </form>

      <p className="ms-auto text-xs text-gray-500 text-center">
        상대방을 향한 비난이나 욕설은 차단 등의 조치가 취해질 수 있습니다.
      </p>
    </>
  );
}

export default ArticleRead;
