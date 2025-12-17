import { create } from "zustand";
import axiosClient from "../api/axiosClient";

const useUserStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    // LOGIN USING USERNAME + PASSWORD
    login: async (username, password) => {
        try {
            set({ loading: true, error: null });

            const res = await axiosClient.post("/auth/login", {
                username,
                password
            });

            localStorage.setItem("token", res.data.token);

            set({
                user: res.data.user,
                loading: false,
            });

            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || "Login failed",
                loading: false
            });

            return false;
        }
    },


    // REGISTER USING USERNAME + PASSWORD
    register: async (username, password) => {
        try {
            set({ loading: true, error: null });

            const res = await axiosClient.post("/auth/register", {
                username,
                password
            });

            localStorage.setItem("token", res.data.token);

            set({ user: res.data.user, loading: false });
            return true;
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Registration failed"
            });
            return false;
        }
    },

    
    fetchMe: async () => {
        try {
            const res = await axiosClient.get("/auth/me");
            set({ user: res.data });
        } catch (err) {
            localStorage.removeItem("token");
            set({ user: null });
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null });
    },
}));

export default useUserStore;
