"use client";

import { authClient } from "@/app/lib/auth-client";
import { useGoogleAuth } from "@/app/lib/helper/utils-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const { handleGoogleAuth, googleLoading } = useGoogleAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const userLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const userData = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
        rememberMe: true,
      });

      if (!error) {
        const redirectPath =
          data.user.role === "seeker" ? "/job-seeker" : "/recruiter";

        router.push(redirectPath);
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-wrapper my-20">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-2 text-center">
          <h2 className="text-4xl">Welcome Back</h2>
          <p className="text-gray-500">Resume your adventure with CloudTrail</p>
        </div>

        <Card className="w-full max-w-xl mx-auto rounded-none mt-10">
          <Card.Content className="p-10">
            <Form onSubmit={userLogin} className="space-y-8">
              <TextField name="email" type="email" isRequired>
                <Label>Email</Label>
                <Input
                  className="rounded-none bg-sky-50 border border-sky-50 shadow-none"
                  placeholder="Enter your email"
                />
                <FieldError />
              </TextField>

              <TextField isRequired className="w-full">
                <Label>Password</Label>

                <InputGroup className="rounded-none">
                  <InputGroup.Input
                    className="w-full rounded-none"
                    type={isVisible ? "text" : "password"}
                    name="password"
                    placeholder="your password"
                  />

                  <InputGroup.Suffix className="pr-0 rounded-none">
                    <Button
                      className="rounded-none"
                      isIconOnly
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      size="sm"
                      variant="ghost"
                      onPress={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeSlash className="size-4" />
                      )}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>

              <Button
                isDisabled={loading}
                type="submit"
                variant="outline"
                // isLoading={isPending}
                className=" p-5 rounded-none w-full bg-sky-500 text-white"
              >
                {loading ? (
                  "Logging..."
                ) : (
                  <>
                    <Check /> Sign In
                  </>
                )}
              </Button>
            </Form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-300"></div>

              <p className="text-gray-500 text-sm whitespace-nowrap">
                Or continue with
              </p>

              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <Button
              onClick={handleGoogleAuth}
              isDisabled={googleLoading}
              type="button"
              variant="outline"
              className=" p-5 border border-gray-300 rounded-none w-full bg-transparent p-2 font-semibold flex items-center gap-2 justify-center"
            >
              {googleLoading ? (
                "Redirect to google..."
              ) : (
                <>
                  <FcGoogle /> Sign In with Google
                </>
              )}
            </Button>

            <div className="mt-5 flex items-center gap-2 justify-center">
              <p className="text-gray-500 text-md">Don't have an account?</p>

              <Link href="/signup" className="text-sky-600 font-semibold">
                Sign Up
              </Link>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
