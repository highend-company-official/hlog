import { supabase } from "@/shared";

async function quitUser() {
  const response = await supabase.rpc("delete_user").throwOnError();

  return response;
}

export default quitUser;
