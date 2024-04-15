import * as shared from "@/shared";
import { useEffect } from "react";
import { MOCK_DATA } from "../../shared/model";

function ArticleRead() {
  const { scrollToTop } = shared.useScrollToTop();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <img
        src={MOCK_DATA.thumbnail}
        alt={MOCK_DATA.summary}
        className="rounded-xl mt-9 w-full h-96 object-cover"
      />
      <h3 className="mt-4 text-5xl break-keep break-words">
        {MOCK_DATA.title}
      </h3>
      <span className="text-subTitle pt-4">{MOCK_DATA.summary}</span>

      <section className="flex mt-5">
        <img
          src={MOCK_DATA.user.profileUrl}
          alt={MOCK_DATA.user.username}
          className="w-12 h-12 mr-3 rounded-full"
        />
        <div className="flex items-center justify-center">
          <span className="font-bold">{MOCK_DATA.user.username}</span>
          <span className="ml-2 font-thin">{MOCK_DATA.createdAt}</span>
        </div>
      </section>

      <div className="mt-9 text-base leading-6">{MOCK_DATA.body}</div>
    </>
  );
}

export default ArticleRead;
