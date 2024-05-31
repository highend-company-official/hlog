import { Link } from "react-router-dom";

import SignUpForm from "@/features/auth/ui/sign-up-form";

function SignUpPage() {
  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="text-2xl font-semibold mb-7">
            <Link to="/">
              <span className="relative inline-block before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-primary">
                <span className="relative text-white">HLOG</span>
              </span>
            </Link>
          </h1>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                양질의 글을 매일 확인해보세요!
              </h1>

              <SignUpForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUpPage;
