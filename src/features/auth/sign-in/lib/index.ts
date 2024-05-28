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

async function withGithub() {
  const signInResponse = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  return signInResponse;
}

export default { withEmail, withGithub };
