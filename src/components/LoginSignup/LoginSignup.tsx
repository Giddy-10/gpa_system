import React from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import RadioComponent from "../Forms/RadioComponent"

interface ExpProps {
    type: "LOGIN" | "SIGNUP"
}


const LoginSignup = (props: ExpProps) => {
    return (
        <Card className="min-w-96 m-4">
            <CardHeader>
                <CardTitle>
                    {props.type == "LOGIN" ? "Log in" : "Sign up"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form className="grid w-full items-center gap-5 [&>label]:text-base [&>label]:flex [&>label]:flex-col [&>label]:gap-1">
                    <Label>
                        Username:
                        <Input type="text" placeholder="username" required />
                    </Label>
                    <Label>
                        Password:
                        <Input
                            type="password"
                            placeholder="password"
                            required
                        />
                    </Label>
                    {props.type == "LOGIN" ? null : (
                        <>
                            <Label>
                                Confirm password:
                                <Input
                                    type="password"
                                    placeholder="confirm password"
                                    required
                                />
                            </Label>
                            <RadioComponent
                                name="role"
                                values={["Student", "Admin"]}
                            />
                        </>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginSignup
