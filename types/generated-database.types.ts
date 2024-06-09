export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      article_categories: {
        Row: {
          article_id: string;
          category_id: string;
          id: string;
        };
        Insert: {
          article_id: string;
          category_id: string;
          id?: string;
        };
        Update: {
          article_id?: string;
          category_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "article_categories_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "article_categories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      articles: {
        Row: {
          body: string | null;
          created_at: string;
          has_comments: boolean | null;
          has_hit: boolean | null;
          has_like: boolean | null;
          hits: number | null;
          id: string;
          summary: string | null;
          thumbnail: string | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          has_comments?: boolean | null;
          has_hit?: boolean | null;
          has_like?: boolean | null;
          hits?: number | null;
          id?: string;
          summary?: string | null;
          thumbnail?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          has_comments?: boolean | null;
          has_hit?: boolean | null;
          has_like?: boolean | null;
          hits?: number | null;
          id?: string;
          summary?: string | null;
          thumbnail?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_article_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      categories: {
        Row: {
          category: string | null;
          created_at: string;
          id: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          id?: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          id?: string;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          article_id: string | null;
          body: string | null;
          created_at: string;
          id: string;
          user_id: string | null;
        };
        Insert: {
          article_id?: string | null;
          body?: string | null;
          created_at?: string;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          article_id?: string | null;
          body?: string | null;
          created_at?: string;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "comments_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_comment_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      likes: {
        Row: {
          article_id: string | null;
          created_at: string;
          id: number;
          user_id: string | null;
        };
        Insert: {
          article_id?: string | null;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          article_id?: string | null;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "likes_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profile_settings: {
        Row: {
          bio: Json | null;
          created_at: string;
          id: number;
          user_id: string | null;
        };
        Insert: {
          bio?: Json | null;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          bio?: Json | null;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profile_settings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          description: string | null;
          email: string | null;
          id: string;
          link: string | null;
          phone: string | null;
          profile_url: string | null;
          updatedat: string | null;
          username: string | null;
          verified: Database["public"]["Enums"]["status"];
        };
        Insert: {
          description?: string | null;
          email?: string | null;
          id: string;
          link?: string | null;
          phone?: string | null;
          profile_url?: string | null;
          updatedat?: string | null;
          username?: string | null;
          verified?: Database["public"]["Enums"]["status"];
        };
        Update: {
          description?: string | null;
          email?: string | null;
          id?: string;
          link?: string | null;
          phone?: string | null;
          profile_url?: string | null;
          updatedat?: string | null;
          username?: string | null;
          verified?: Database["public"]["Enums"]["status"];
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      verify: {
        Row: {
          created_at: string;
          id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "verify_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      get_article_by_id: {
        Args: {
          article_id_param: string;
        };
        Returns: {
          id: string;
          created_at: string;
          title: string;
          summary: string;
          body: string;
          thumbnail: string;
          has_comments: boolean;
          has_like: boolean;
          has_hit: boolean;
          hits: number;
          likes: number;
          profile_url: string;
          username: string;
          user_id: string;
        }[];
      };
      get_articles: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
          created_at: string;
          title: string;
          summary: string;
          thumbnail: string;
          has_comments: boolean;
          has_like: boolean;
          has_hit: boolean;
          hits: number;
          likes: number;
          profile_url: string;
          username: string;
          user_id: string;
        }[];
      };
      increment_article_hits: {
        Args: {
          article_id: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      status: "pending" | "verified" | "none";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
