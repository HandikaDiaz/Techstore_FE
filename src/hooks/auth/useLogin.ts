import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginSchema, type LoginFormInputType } from "../../schema/login-schema";
import { api } from "../../lib/api";
import type { AxiosError } from 'axios';
import type { ErrorResponse } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../lib/queryClient';

export function useLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputType>({
        resolver: zodResolver(loginSchema),
    });

    const { login } = useAuth();

    async function loginUser(data: LoginFormInputType) {
        try {
            const res = await api.post("/auth/login", data);
            const { token } = res.data;
            Cookies.set("token", token, { expires: 7 });
            login(token);
            toast.success("Login successful!");
            return res.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                toast.error((axiosError.response.data as ErrorResponse).status || "Login failed!");
            } else {
                toast.error("Unexpected error occurred!");
            }
        }
    };

    const { mutateAsync: createUserAsync } = useMutation({
        mutationKey: ['loginUser'],
        mutationFn: loginUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });

    async function onsubmit(data: LoginFormInputType) {
        try {
            await createUserAsync(data);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        } catch (error) {
            if (error instanceof Error) {
                const serverError = (error as Error)?.message;
                if (serverError) {
                    toast.error("User not found. Please check your credentials.");
                } else {
                    toast.error(error.message);
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }

    const submit = handleSubmit(onsubmit);

    return {
        register,
        submit,
        errors,
        isSubmitting
    };
};