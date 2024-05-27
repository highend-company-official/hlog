import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";

import signIn from "../lib";
import { useToastStore } from "@/app/store";
import * as shared from "@/shared";

type FormValues = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const { register, handleSubmit } = useForm<FormValues>();

  const handleEmailSignIn = handleSubmit((data) => {
    const { email, password } = data;

    signIn
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
            queryKey: [shared.QUERY_CONSTS.SESSION],
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
    signIn.withGithub();
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleEmailSignIn}>
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
  );
};

export default SignInForm;
