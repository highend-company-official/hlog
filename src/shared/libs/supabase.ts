import { createClient } from "@supabase/supabase-js";
import { Database } from "types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
