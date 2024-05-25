import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  body: z.string(),
  summary: z.string().optional(),
  hits: z.number(),
  created_at: z.date(),
  updated_at: z.date().optional(),
  verified: z.boolean(),
  has_comments: z.boolean(),
  has_like: z.boolean(),
  has_hit: z.boolean(),
  profile: z.object({
    user_id: z.string(),
    username: z.string(),
    profile_url: z.string(),
  }),
  likes: z.number(),
});

export const LikeSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  article_id: z.string(),
});

export const CommentSchema = z.object({
  id: z.string(),
  body: z.string(),
  created_at: z.date(),
  profile: z.object({
    user_id: z.string(),
    username: z.string(),
    profile_url: z.string(),
  }),
  likes: z.array(LikeSchema),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  profile_url: z.string().url(),
  link: z.string().url(),
  phone: z.string(),
  description: z.string(),
  created_at: z.date(),
});

export const ReplySchema = z.object({
  id: z.string(),
  body: z.string(),
  created_at: z.date(),
  updatedAt: z.date(),
  profiles: UserSchema,
});

export const SessionSchema = z.object({
  provider_token: z.string().nullable(),
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  token_type: z.string(),
  user: UserSchema,
});

export type ArticleType = z.infer<typeof ArticleSchema>;
export type ReplyType = z.infer<typeof ReplySchema>;
export type CommentType = z.infer<typeof CommentSchema>;
export type UserType = z.infer<typeof UserSchema>;
export type LikeType = z.infer<typeof LikeSchema>;
export type SessionType = z.infer<typeof SessionSchema>;
