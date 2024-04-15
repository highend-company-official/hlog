import { Link } from "react-router-dom";

type FeedCardProps = {
  articleId: string;
};

const FeedCard = ({ articleId }: FeedCardProps) => {
  return (
    <Link to={`article-read/${articleId}`}>
      <img src="" alt="" />

      <div>
        <h3></h3>
      </div>
    </Link>
  );
};

export default FeedCard;
