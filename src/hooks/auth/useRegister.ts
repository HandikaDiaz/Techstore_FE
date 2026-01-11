import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { registerSchema, type RegisterFormInputType } from "../../schema/register-schema";
import { api } from "../../lib/api";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../lib/queryClient";

export function useRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormInputType>({
        resolver: zodResolver(registerSchema),
    });

    const { login } = useAuth();

    async function registerUser(data: RegisterFormInputType) {
        try {
            const res = await api.post("/auth/register", data);
            const { token } = res.data;
            Cookies.set("token", token, { expires: 7 });
            login(token);
            toast.success("Registration successful!");
            return res.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                toast.error((axiosError.response.data as ErrorResponse).status || "Registration failed!");
            } else {
                toast.error("Unexpected error occurred!");
            }
        }
    };

    const { mutateAsync: createUserAsync } = useMutation({
        mutationKey: ['createUser'],
        mutationFn: registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });

    async function onsubmit(data: RegisterFormInputType) {
        try {
            await createUserAsync(data);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        } catch (error) {
            if (error instanceof Error) {
                const serverError = (error as Error)?.message;
                if (serverError) {
                    toast.error("Registration failed. Please try again.");
                } else {
                    toast.error(error.message);
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    const submit = handleSubmit(onsubmit);

    return {
        register,
        handleSubmit,
        submit,
        errors,
        isSubmitting
    };
};