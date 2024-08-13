import { create } from "zustand";
import IUser from "../interfaces/IUser";

const useStoreAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setUser: (user: IUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
}));

export default useStoreAuth;
