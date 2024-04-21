export type Article = {
  id: string;
  title: string;
  thumbnail: string;
  body: string;
  summary: string;
  hits: number;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
  user: {
    username: string;
    profileUrl: string;
  };
  like: Like[];
};

export type Like = {
  userId: string;
  post: string;
};

export type Comment = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  users: {
    username: string;
    profileUrl: string;
  };
  likes: {
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

export type APIResponse<DataType, ErrorType = void> = {
  data: DataType;
  error: ErrorType;
};
