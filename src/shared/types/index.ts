export type Article = {
  id: string;
  title: string;
  thumbnail: string;
  body: string;
  summary: string;
  hits: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  like: Like[];
};

export type Like = {
  userId: string;
  post: string;
};

export type Comment = {
  id: string;
  commentContent: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  likeNumber: number;
  isLiked: boolean;
  like: {
    id: string;
    userId: string;
  }[];
};

export type Reply = {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export type User = {
  id: string;
  username: string;
  profileUrl: string;
  description: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
