import { useNavigate } from "react-router-dom";
import * as shared from "@/shared";

function FeedPage() {
  const navigate = useNavigate();

  return (
    <>
      <shared.Button
        onClick={() => navigate("/article-read/1")}
        intent="primary"
      >
        테스트 페이지로 이동
      </shared.Button>
    </>
  );
}

export default FeedPage;
