import { useSession } from ".";

const useIsMySession = (userId: string) => {
  const {
    data: { session },
  } = useSession();

  return session?.user.id === userId;
};

export default useIsMySession;
