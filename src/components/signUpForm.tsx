import { Eye, EyeOff, Loader2Icon, Lock, Mail, User } from "lucide-react";
import { useRegister } from "../hooks/auth/useRegister";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
    const {submit, register, isSubmitting} = useRegister();

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="register-username" className="text-gray-700">
                    Username
                </Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        id="register-username"
                        type="text"
                        placeholder="Enter your username"
                        className="pl-10"
                        required
                        {...register("username")}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="register-email" className="text-gray-700">
                    Email Address
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        required
                        {...register("email")}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="register-password" className="text-gray-700">
                    Password
                </Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10"
                        required
                        {...register("password")}
                    />
                    <Button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                        )}
                    </Button>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <button type="button" className="text-blue-600 hover:text-blue-700">
                        Terms & Conditions
                    </button>
                </Label>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
                {isSubmitting ? <Loader2Icon className="animate-spin" /> : "Create Account"}
            </Button>

            <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer p-0 bg-transparent hover:bg-transparent"
                    onClick={() => switchTab("login")}
                >
                    Sign in
                </Button>
            </div>
        </form>
    );
};