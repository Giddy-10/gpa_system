import { Button } from "@/components/ui/button"
import { checkAuthStatus } from "@/app/lib/auth"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
    const { isAuthenticated } = await checkAuthStatus()
    if (isAuthenticated) {
        redirect("/dashboard")
    }
    return (
        <div className={"min-h-[100vh] bg-[url('/background_1.jpg')] bg-cover"}>
            <div className="h-[100vh] grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 items-center border-2">
                <div className="backdrop-blur-sm flex flex-col justify-center min-h-3/4 shadow-lg">
                    <div className="text-4xl font-extrabold tracking-tight flex flex-row justify-center items-center uppercase">
                        <p>
                            <span className="text-yellow-500">USIU</span> GPA
                            Calculator
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-10 p-6">
                        <p className="text-lg opacity-80 font-semibold">
                            Achieve your GPA projections, keep track of your
                            progress and receive instant feedback
                        </p>
                        <div className="flex flex-row w-3/4 justify-between items-center">
                            <Link href={"/signup"}>
                                <Button className="bg-yellow-400 text-black font-semibold hover:bg-yellow-300">
                                    Sign Up
                                    <ChevronRight />
                                </Button>
                            </Link>
                            <div>
                                Already have an account?{" "}
                                <Link href={"/login"}>
                                    <Button>Login</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Image
                        src={"/hero_pic_2_v4.png"}
                        alt="chart"
                        width={600}
                        height={300}
                    />
                </div>
            </div>
        </div>
    )
}
