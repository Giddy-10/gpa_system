"use client"
import React, { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const DashboardProjectionEdit = () => {
    const [newProjection, setNewProjection] = useState<number | undefined>()
    const router = useRouter()

    const handleProjectionChange = () => {
        //handle here
        console.log(newProjection)
        router.refresh()
    }

    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <div className="rounded-lg px-3 py-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground duration-100 **:duration-100">
                        Change projection
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 text-center flex flex-col gap-2 items-center">
                    <p>Input new projection</p>
                    <Input
                        className="w-fit"
                        type="number"
                        min={1}
                        max={4}
                        step={0.01}
                        onInput={(e) =>
                            setNewProjection(Number(e.currentTarget.value))
                        }
                    />
                    <div className="mt-4 flex flex-row justify-around gap-2">
                        <PopoverClose>
                            <Button variant={"outline"}>Cancel</Button>
                        </PopoverClose>
                        <PopoverClose>
                            <Button onClick={() => handleProjectionChange()}>
                                Send
                            </Button>
                        </PopoverClose>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DashboardProjectionEdit
