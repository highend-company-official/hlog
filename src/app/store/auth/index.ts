import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

type StateType = {
  session: Session | null;
};

type ActionType = {
  updateSession: (session: Session | null) => void;
};

const useAuth = create<StateType & ActionType>((set) => ({
  session: null,
  updateSession: (session) => set(() => ({ session })),
}));

export default useAuth;
