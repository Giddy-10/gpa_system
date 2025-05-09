"use client"
import React, { useState } from "react"
import Cookies from "js-cookie"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card"
import RadioComponent from "../Forms/RadioComponent"
import { Button } from "../ui/button"
import Link from "next/link"
import { Separator } from "../ui/separator"
import { LogIn } from "lucide-react"
import { redirect, useRouter } from "next/navigation"

interface ExpProps {
    type: "LOGIN" | "SIGNUP"
}

const LoginSignup = (props: ExpProps) => {
    const [email, setEmail] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()
    const [passwordConfirmation, setPasswordConfirmation] = useState<
        string | undefined
    >()

    const router = useRouter()

    const handleLogin = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        const response = await fetch(
            "https://gpa-system.onrender.com/auth/login",
            {
                // Or your login endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        )

        const data = await response.json()
        console.log(data)

        if (response.ok && data.access) {
            // Assuming your backend returns a 'token' property
            Cookies.set("gpauth-token", data.access, {
                expires: 7, // Example: Expires in 7 days
                secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
                path: "/",
            })
            redirect("/dashboard")
        } else {
            setEmail("")
            setPassword("")
        }
    }

    const handleSignup = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        const response = await fetch(
            "https://gpa-system.onrender.com/auth/registration",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password1: password,
                    password2: passwordConfirmation,
                }),
            }
        )

        const data = await response.json()
        console.log(data)

        if (response.ok && data.token) {
            // Assuming your backend returns a 'token' property
            Cookies.set("gpauth-token", data.access, {
                expires: 7, // Example: Expires in 7 days
                secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
                path: "/",
            })
            redirect("/dashboard")
        } else {
            router.refresh()
        }
    }
    return (
        <Card className="min-w-96 max-w-[600px] my-4 mx-auto shadow-md">
            <CardHeader>
                <CardTitle>
                    {props.type == "LOGIN" ? "Log in" : "Sign up"}
                </CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid w-full items-center gap-5 [&>label]:text-base [&>label]:flex [&>label]:flex-col [&>label]:gap-1">
                    <Label>
                        Email:
                        <Input
                            type="email"
                            placeholder="example@domain.tld"
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            required
                        />
                    </Label>
                    <Label>
                        Password:
                        <Input
                            type="password"
                            placeholder="****************"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            required
                        />
                    </Label>
                    {props.type == "LOGIN" ? null : (
                        <>
                            <Label>
                                Confirm password:
                                <Input
                                    type="password"
                                    placeholder="****************"
                                    value={passwordConfirmation}
                                    onChange={(e) =>
                                        setPasswordConfirmation(
                                            e.currentTarget.value
                                        )
                                    }
                                    required
                                />
                            </Label>
                            <label>Role:</label>
                            <RadioComponent
                                name="role"
                                values={["Student", "Admin"]}
                                defaultValue={"Student"}
                            />
                        </>
                    )}
                    <Separator />
                    <div className="flex flex-row justify-between items-center gap-4">
                        <Button
                            type="button"
                            className="px-8"
                            onClick={(e) => {
                                if (props.type === "LOGIN") {
                                    handleLogin(e)
                                } else {
                                    handleSignup(e)
                                }
                            }}
                        >
                            {props.type == "LOGIN" ? "Log in" : "Sign up"}
                            <LogIn className="ml-2" />
                        </Button>
                        {props.type == "LOGIN" ? (
                            <div className="my-2">
                                <p className="opacity-70 inline">
                                    {"Don't have an account?"}
                                </p>
                                <Link href={"/signup"} className="mx-2">
                                    <Button variant={"outline"}>Sign Up</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="my-2">
                                <p className="opacity-70 inline">
                                    Already have an account?
                                </p>
                                <Link href={"/login"} className="mx-2">
                                    <Button variant={"outline"}>Log In</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginSignup
