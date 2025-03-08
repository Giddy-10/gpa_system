import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
    return (
        <div className="min-h-96 my-20 grid grid-cols-1 md:grid-cols-2">
            <div className="text-4xl font-extrabold tracking-tight flex flex-row justify-center items-center uppercase">
                GPA Calculator
            </div>
            <div className="flex flex-col justify-center items-center gap-10 p-6">
                <p className="text-lg opacity-80 font-semibold">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Reprehenderit, est, dolorum dolorem nobis, placeat obcaecati
                    fugiat esse qui reiciendis eos soluta asperiores autem
                    adipisci voluptates enim expedita quam officia eaque.
                </p>
                <div className="flex flex-row w-full">
                    <Link href={"/dashboard"}>
                        <Button>
                            Dashboard
                            <ChevronRight />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
