import { useState } from "react";
import SingInForm from "./signInForm";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import SignUpForm from "./signUpForm";

export interface AuthModalProps {
    triggerName: string;
    variant?: "login" | "register" | "default";
    defaultTab?: "login" | "register";
}

export function AuthModal({
    triggerName,
    variant = "default",
    defaultTab = "login",
}: AuthModalProps) {
    const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
    const [showPassword, setShowPassword] = useState(false);

    const getTriggerClassName = () => {
        switch (variant) {
            case "login":
                return "px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors";
            case "register":
                return "px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors";
            default:
                return "";
        }
    };

    const switchTab = (tab: "login" | "register") => {
        setActiveTab(tab);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant={variant === "register" ? "default" : "outline"}
                    className={getTriggerClassName()}
                    onClick={() => setActiveTab(variant === "register" ? "register" : "login")}
                >
                    {triggerName}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
                <div className="p-6">
                    <DialogHeader className="text-center mb-6">
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            {activeTab === "login" ? "Welcome Back" : "Create Account"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            {activeTab === "login"
                                ? "Sign in to your account to continue"
                                : "Fill in your details to get started"}
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs
                        value={activeTab}
                        onValueChange={(value) => setActiveTab(value as "login" | "register")}
                        className="w-full"
                    >
                        <TabsList className="w-full grid grid-cols-2 mb-6">
                            <TabsTrigger
                                value="login"
                                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                            >
                                Login
                            </TabsTrigger>
                            <TabsTrigger
                                value="register"
                                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                            >
                                Register
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="login" className="space-y-4">
                            <SingInForm
                                switchTab={switchTab}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />
                        </TabsContent>

                        <TabsContent value="register" className="space-y-4">
                            <SignUpForm
                                switchTab={switchTab}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}