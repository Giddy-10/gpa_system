"use client"
import React, { PropsWithChildren } from "react"
import { motion } from "motion/react"
import { Button } from "../ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface ExpProps {
    backwardMove?: boolean
    setSection: (add: boolean) => void
}

const StartingDiv = (props: PropsWithChildren<ExpProps>) => {
    return (
        <motion.div
            className="absolute"
            initial={
                props.backwardMove
                    ? { left: "-30%", opacity: 0 }
                    : { left: "30%", opacity: 0 }
            }
            animate={{
                left: 0,
                opacity: 1,
                transition: {
                    default: { type: "spring", stiffness: 70, bounce: 0.05 },
                    duration: 0.1,
                },
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
            {props.children}
            <div className="flex flex-row justify-between mt-10">
                <Button
                    onClick={() => props.setSection(false)}
                    variant={"outline"}
                >
                    <ArrowLeft /> Back
                </Button>
                <Button onClick={() => props.setSection(true)}>
                    Next <ArrowRight />
                </Button>
            </div>
        </motion.div>
    )
}

export default StartingDiv
