import { create } from "zustand";
import IUser from "../interfaces/IUser";

const useStoreAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setUser: (user: IUser) => {
    set({ user });
  },
}));

export default useStoreAuth;
