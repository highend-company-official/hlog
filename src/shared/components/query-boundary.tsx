import { Suspense, useCallback, useRef, type ErrorInfo } from "react";
import { TbFaceIdError } from "react-icons/tb";
import { flushSync } from "react-dom";
import { QueryErrorResetBoundary, useQueryClient } from "@tanstack/react-query";

import { ErrorBoundary } from "react-error-boundary";
import Button from "./button";

type Props = {
  children: React.ReactNode;
  errorFallback?: React.FC<ErrorFallbackProps>;
  loadingFallback?: React.ReactNode;
};

type ErrorFallbackProps = {
  reset?(): void;
  fallback?: React.ReactNode;
};

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ reset }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center">
      <TbFaceIdError size={50} />
      <span className="font-bold">
        Oops! 요청을 처리하는 중에 오류가 발생했습니다.
      </span>
      <p>오류가 지속된다면 문의해주세요 (functional.hong@gmail.com)</p>

      <Button className="mt-4" onClick={reset}>
        다시 시도하기
      </Button>
    </div>
  );
};

const QueryBoundary = ({
  children,
  loadingFallback = <></>,
  errorFallback = DefaultErrorFallback,
}: Props) => {
  const queryClient = useQueryClient();
  const ref = useRef<ErrorBoundary>(null);

  const reset = useCallback(async () => {
    const errorsKeys = queryClient
      .getQueryCache()
      .getAll()
      .filter((q) => q.state.status === "error")
      .map((e) => e.queryKey);

    errorsKeys.forEach((keys) => {
      queryClient.refetchQueries({
        queryKey: keys,
      });
    });

    flushSync(() => {
      ref.current?.resetErrorBoundary();
    });
  }, [queryClient]);

  const handleError = useCallback((error: Error, info: ErrorInfo) => {
    console.error(error, info);
  }, []);

  let errorFallbackElement: React.ReactNode = loadingFallback;
  if (errorFallback) {
    const Component = errorFallback;
    errorFallbackElement = (
      <Component fallback={loadingFallback} reset={reset} />
    );
  }

  return (
    <QueryErrorResetBoundary>
      <Suspense fallback={loadingFallback}>
        <ErrorBoundary
          ref={ref}
          // @ts-ignore
          fallback={errorFallbackElement || loadingFallback}
          onError={handleError}
        >
          {children}
        </ErrorBoundary>
      </Suspense>
    </QueryErrorResetBoundary>
  );
};

export default QueryBoundary;
