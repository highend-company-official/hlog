import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";

import * as features from "@/features";
import * as shared from "@/shared";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/shared";
import { useToastStore } from "@/app/store";

type FormValues = {
  email: string;
  password: string;
};

function SignInPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const { register, handleSubmit } = useForm<FormValues>();

  const handleEmailSignIn = handleSubmit((data) => {
    const { email, password } = data;

    features.auth.signIn
      .withEmail({ email, password })
      .then(({ error }) => {
        if (error?.name === "AuthApiError" && error.status === 400) {
          addToast({
            type: "error",
            content: "로그인 정보가 맞지 않습니다. 다시 시도해주세요.",
            hasCloseButton: true,
          });
        }

        if (!error) {
          queryClient.refetchQueries({
            queryKey: [useSession.pk],
          });

          addToast({
            type: "success",
            content: "로그인에 성공했습니다!",
            hasCloseButton: true,
            staleTime: 3000,
          });

          navigate("/", {
            replace: true,
          });
        }
      })
      .catch(() => {
        addToast({
          type: "error",
          content: "문제가 발생했습니다.",
          hasCloseButton: true,
        });
      });
  });

  const handleGithubSignIn = () => {
    features.auth.signIn.withGithub();
  };

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-gray-900 font-['Jersey15Charted'] text-6xl"
          >
            HLOG
          </Link>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                매일 검증된 글을 확인해보세요!
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleEmailSignIn}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    이메일 (Email)
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="example@mail.com"
                    required
                    {...register("email")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                    {...register("password")}
                  />
                </div>
                <div className="flex items-center">
                  <Link
                    to="#"
                    className="text-sm font-medium text-primary-600 hover:underline"
                    // TODO: 비밀번호 잊었나요? 만들기
                  >
                    비밀번호를 잊으셨나요?
                  </Link>
                </div>
                <shared.Button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  로그인
                </shared.Button>

                <shared.Divider>또는</shared.Divider>

                <div
                  role="button"
                  className="flex items-center justify-center w-full px-4 py-3 mt-2 text-sm font-bold text-gray-100 bg-gray-900 rounded-lg cursor-pointer"
                  onClick={handleGithubSignIn}
                >
                  <FaGithub size={26} />
                  <span className="pl-3">Github로 로그인하기</span>
                </div>

                <p className="text-sm font-light text-gray-500 ">
                  아직 계정이 없으신가요?
                  <Link
                    to="/auth/sign-up"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    회원가입
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignInPage;
