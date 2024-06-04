const SearchQueryKey = {
  articleList: (articleId: string) => ["SEARCH", "ARTICLE", articleId],
  profileList: (profileId: string) => ["SEARCH", "PROFILE", profileId],
};

export default SearchQueryKey;
