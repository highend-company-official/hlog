import { useSession } from ".";

const useIsMySession = (userId: string) => {
  const {
    data: { session },
  } = useSession();

  return {
    isMySession: session?.user.id === userId,
    user: session?.user,
  };
};

export default useIsMySession;
