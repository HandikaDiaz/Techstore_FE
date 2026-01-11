import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import type { ErrorResponse } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../lib/api";

export function useLogout() {
    const logout = async () => {
        const res = api.post("/auth/logout")
            .then(() => {
                Cookies.remove("token");
                toast.success("Logout successful!");
            });

        try {
            await res;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                toast.error((axiosError.response.data as ErrorResponse).status || "Registration failed!");
            } else {
                toast.error("Unexpected error occurred!");
            }
        }
    };

    return logout;
};