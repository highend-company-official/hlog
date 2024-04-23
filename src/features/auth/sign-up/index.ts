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
      emailRedirectTo: "http://localhost:5173/",
    },
  });

  return signUpResponse;
}

async function withGithub() {}
async function withKakao() {}

export default {
  withEmail,
  withGithub,
  withKakao,
};
