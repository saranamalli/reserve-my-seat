import { create } from "zustand";
import { AUTH_TOKEN_KEY } from "../utils/constants";

interface User {
    userName: string;
    emailId: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    login: (data: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem(AUTH_TOKEN_KEY),

    login: (data) => {
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        set({ user: data.user, token: data.token });
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    }
}));