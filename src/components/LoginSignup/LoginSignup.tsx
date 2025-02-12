import React from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import RadioComponent from "../Forms/RadioComponent"
import { Button } from "../ui/button"

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
                            <label>Role:</label>
                            <RadioComponent
                                name="role"
                                values={["Student", "Admin"]}
                                defaultValue={"Student"}
                            />
                        </>
                    )}
                    <div className="flex flex-row justify-end gap-4">
                        <Button type="button">
                            {props.type == "LOGIN" ? "Log in" : "Sign up"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginSignup
