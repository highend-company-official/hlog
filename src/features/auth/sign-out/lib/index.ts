import { supabase } from "@/shared";

async function signOut() {
  const { error } = await supabase.auth.signOut();

  return error;
}

export default signOut;
