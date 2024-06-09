import { MergeDeep } from "type-fest";
import { Database as DatabaseGenerated } from "./generated-database.types";

// Override the type for a specific column in a view:
export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Views: {
        articles: {
          Row: {
            body: string;
            created_at: string;
            has_comments: boolean;
            has_hit: boolean;
            has_like: boolean;
            hits: number;
            id: string;
            summary: string | null;
            thumbnail: string;
            title: string;
            user_id: string;
          };
        };
        profiles: {
          Row: {
            description: string | null;
            email: string;
            id: string;
            link: string | null;
            phone: string | null;
            profile_url: string | null;
            updatedat: string | null;
            username: string;
            verified: Database["public"]["Enums"]["status"];
          };
        };
      };
    };
  }
>;
