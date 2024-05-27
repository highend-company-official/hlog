import { supabase } from "@/shared";

async function quit() {
  const quitResponse = await supabase.rpc("delete_user");

  if (quitResponse.error) throw quitResponse.error;

  return quitResponse;
}

export default quit;
