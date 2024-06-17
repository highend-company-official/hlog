import { supabase } from "@/shared";

type EmailSignUpParams = {
  email: string;
  password: string;
  username: string;
};

async function withEmail({ email, password, username }: EmailSignUpParams) {
  const signUpResponse = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
      emailRedirectTo: "https://tech-hlog.vercel.app/",
    },
  });

  return signUpResponse;
}

const signUp = {
  withEmail,
};

export default signUp;
