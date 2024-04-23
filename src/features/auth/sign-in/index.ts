import { supabase } from "@/shared";

type EmailSignInParams = {
  email: string;
  password: string;
};

async function withEmail({ email, password }: EmailSignInParams) {
  const signInResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return signInResponse;
}

export default { withEmail };
