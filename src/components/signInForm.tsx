import { Mail, EyeOff, Eye, Lock, Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useLogin } from "../hooks/auth/useLogin";

export interface SignInFormProps {
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    switchTab: (tab: "login" | "register") => void;
};

export default function SingInForm({
    switchTab,
    showPassword = false,
    setShowPassword
}: SignInFormProps) {
    const { register, submit, isSubmitting } = useLogin();

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="login-email" className="text-gray-700">
                    Email or Username
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        id="login-email"
                        type="text"
                        placeholder="Enter your email/username"
                        className="pl-10"
                        required
                        {...register("username")}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="login-password" className="text-gray-700">
                        Password
                    </Label>
                    <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700"
                    >
                        Forgot password?
                    </button>
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        required
                        {...register("password")}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                        )}
                    </button>
                </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700  cursor-pointer">
                {isSubmitting ? <Loader2Icon className="animate-spin" /> : "Sign In"}
            </Button>

            <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer p-0 bg-transparent hover:bg-transparent"
                    onClick={() => switchTab("register")}
                >
                    Sign up
                </Button>
            </div>
        </form>
    );
};