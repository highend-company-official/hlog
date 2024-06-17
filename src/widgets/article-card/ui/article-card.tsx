import React from "react";
import {
  useArticleStore,
  useGetArticles,
  type ViewMode,
} from "@/entities/article";

import { ArrayElement } from "@/shared";

import Card from "./card";
import List from "./list";
import Gallery from "./gallery";

type ArticleCardProps = ArrayElement<
  ReturnType<typeof useGetArticles>["data"]["pages"][0]
>;

const ArticleCardRender: React.FC<
  { viewMode: ViewMode } & ArticleCardProps
> = ({ viewMode, ...props }) => {
  switch (viewMode) {
    case "card":
      return <Card {...props} />;
    case "list":
      return <List {...props} />;
    case "gallery":
      return <Gallery {...props} />;
  }
};

const ArticleCard = (props: ArticleCardProps) => {
  const { articleViewMode } = useArticleStore();

  return <ArticleCardRender viewMode={articleViewMode} {...props} />;
};

export default ArticleCard;
