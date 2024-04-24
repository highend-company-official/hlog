export type Article = {
  id: string;
  title: string;
  thumbnail: string;
  body: string;
  summary: string;
  hits: number;
  created_at: string;
  updated_at: string;
  verified: boolean;
  profiles: {
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
  profiles: {
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
  profiles: User;
};

export type User = {
  id: string;
  username: string;
  profileUrl: string;
  description: string;
  createdAt: Date;
};

export type APIResponse<DataType, ErrorType = void> = {
  data: DataType;
  error: ErrorType;
};
