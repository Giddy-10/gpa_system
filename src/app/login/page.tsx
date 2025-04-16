import LoginSignup from "@/components/LoginSignup/LoginSignup"
import { checkAuthStatus } from "@/app/lib/auth"
import { redirect } from "next/navigation"
import React from "react"

const page = async () => {
    const { isAuthenticated } = await checkAuthStatus()
    if (isAuthenticated) {
        redirect("/dashboard")
    }
    return (
        <div>
            <LoginSignup type="LOGIN" />
        </div>
    )
}

export default page
