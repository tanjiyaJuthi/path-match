'use client';

import { authClient } from '@/app/lib/auth-client';
import { useGoogleAuth } from '@/app/lib/helper/utils-client';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const SignUpPage = () => {
    const [password, setPassword] = useState("");
    const { handleGoogleAuth, googleLoading } = useGoogleAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const userSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const userData = Object.fromEntries(formData.entries());

            // check password match
            if (userData.password !== userData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const { data, error } = await authClient.signUp.email({
                name: userData.fullName,
                email: userData.email,
                password: userData.password,
                image: userData.imageUrl,
                wanderLustRole: 'user'
            });

            if (error) {
                console.error(error);
                alert(error.message);
                return;
            }

            // console.log(data);

            router.push("/signin");

        } finally {
                setLoading(false); 
        }
    }

    return (
        <div className="add-user-wrapper my-20">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-2 text-center">
                    <h2 className="text-4xl">Create Account</h2>
                    <p className="text-gray-500">Start your adventure with CloudTrail</p>
                </div>
        
                <Card className="w-full max-w-xl mx-auto rounded-none mt-10">
                    <Card.Content className="p-10">
                        <Form onSubmit={userSignUp} className="space-y-8">
                            <TextField
                                name="fullName"
                                type="text"
                                isRequired
                                validate={(value) => {
                                    if (value.length < 3) {
                                        return "Name must be at least 3 characters";
                                    }

                                    return null;
                                }}
                            >
                                <Label>Full Name</Label>
                                <Input
                                    className='rounded-none bg-sky-50 border border-sky-50 shadow-none'
                                    placeholder="Your Name"
                                />
                                <FieldError />
                            </TextField>

                            <TextField 
                                type="email"
                                name="email" 
                                isRequired
                                validate={(value) => {
                                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                        return "Please enter a valid email address";
                                    }

                                    return null;
                                }}
                            >
                                <Label>Email</Label>
                                <Input 
                                    className='rounded-none bg-sky-50 border border-sky-50 shadow-none' 
                                    placeholder="john@email.com"  />
                                <FieldError />
                            </TextField>

                            <TextField 
                                name="password" 
                                type="password"
                                minLength={8} 
                                isRequired
                                validate={(value) => {
                                    if (value.length < 8) {
                                        return "Password must be at least 8 characters";
                                    }
                                    if (!/[A-Z]/.test(value)) {
                                        return "Password must contain at least one uppercase letter";
                                    }
                                    if (!/[0-9]/.test(value)) {
                                        return "Password must contain at least one number";
                                    }

                                    return null;
                                }}
                            >
                                <Label>Password</Label>
                                <Input
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='rounded-none bg-sky-50 border border-sky-50 shadow-none'
                                    type="password"
                                    placeholder="Tanj!y@Z@m@n098"
                                    
                                />
                                <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                                <FieldError />
                            </TextField>

                            <TextField
                                name="confirmPassword"
                                type="password"
                                isRequired
                                validate={(value) => {
                                    if (!value) {
                                        return "Please confirm your password";
                                    }

                                    if (value !== password) {
                                        return "Passwords do not match";
                                    }

                                    return null;
                                }}
                            >
                                <Label>Confirm Password</Label>

                                <Input
                                    className='rounded-none bg-sky-50 border border-sky-50 shadow-none'
                                    type="password"
                                    placeholder="Confirm Password"
                                />

                                <FieldError />
                            </TextField>

                            <TextField name="imageUrl" isRequired>
                                <Label>Image URL</Label>
                                <Input
                                    className='rounded-none bg-sky-50 border border-sky-50 shadow-none'
                                    type="url"
                                    placeholder="https://example.com/bali-paradise.jpg"
                                    
                                />
                                <FieldError />
                            </TextField>

                            <Button
                                type="submit"
                                isDisabled={loading}
                                className=" p-5 rounded-none bg-sky-500 text-white w-full"
                            >
                                {loading ? (
                                "Registering..."
                                ) : (
                                <>
                                    Sign Up
                                </>
                                )}
                            </Button>
                        </Form>

                        <div className="flex items-center gap-3 my-5">
                            <div className="flex-1 h-px bg-gray-300"></div>

                            <p className="text-gray-500 text-sm whitespace-nowrap">
                                Or sign up with
                            </p>

                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        <Button
                            isDisabled={googleLoading}
                            type="button"
                            className="p-5 border border-gray-300 rounded-none w-full bg-transparent font-semibold flex items-center gap-2 justify-center text-black"
                            onClick={handleGoogleAuth}
                        >
                            {googleLoading ? "Redirect to google..." : <><FcGoogle />  SignUp with Google</>}
                        </Button>

                        <div className="mt-5 flex items-center gap-2 justify-center">
                            <p className="text-gray-500 text-md">Already have an account?</p>

                            <Link href="/signin" className="text-sky-600 font-semibold">
                                Sign in
                            </Link>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
};

export default SignUpPage;