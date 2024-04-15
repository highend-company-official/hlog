import { FeedCard } from "@/entities/feed";
import { MOCK_DATA } from "../../shared/model";

function FeedPage() {
  return (
    <div className="w-full">
      {new Array(20).fill(null).map(() => (
        <FeedCard {...MOCK_DATA} />
      ))}
    </div>
  );
}

export default FeedPage;
