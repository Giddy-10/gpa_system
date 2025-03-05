"use client"
import React, { PropsWithChildren } from "react"
import { AnimatePresence, motion } from "motion/react"

interface ExpProps {
    backwardMove?: boolean
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
                    default: { type: "spring", stiffness: 40 },
                    duration: 0.2,
                },
            }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
            {props.children}
        </motion.div>
    )
}

export default StartingDiv
