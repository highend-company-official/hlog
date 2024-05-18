import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.HLOG_SUPABASE_URL as string;
const supabaseKey = process.env.HLOG_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
