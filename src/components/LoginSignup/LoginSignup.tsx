import React from "react"
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
import { Check, CheckCheck, LogIn } from "lucide-react"

interface ExpProps {
    type: "LOGIN" | "SIGNUP"
}

const LoginSignup = (props: ExpProps) => {
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
                            required
                        />
                    </Label>
                    <Label>
                        Password:
                        <Input
                            type="password"
                            placeholder="****************"
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
                        <Button type="button" className="px-8">
                            {props.type == "LOGIN" ? "Log in" : "Sign up"}
                            <LogIn className="ml-2" />
                        </Button>
                        {props.type == "LOGIN" ? (
                            <div className="my-2">
                                <p className="opacity-70 inline">
                                    Don't have an account?
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
