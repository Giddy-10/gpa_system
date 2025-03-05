"use client"
import StartingDiv from "@/components/Elements/StartingDiv"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence } from "motion/react"
import React, { useState } from "react"

// select major
// enter no. of courses completed
// select current cummulative gpa
// select current courses
// input projection (optional)

type SectionNumbers = 0 | 1 | 2 | 3 | 4

const page = () => {
    const [backwardSectionMove, setBackwardSectionMove] = useState<boolean>(false)
    const [sectionIndex, setSectionIndex] = useState<SectionNumbers>(0)
    const [selectedMajor, setSelectedMajor] = useState<string | null>()
    const [completedCoursesNumber, setCompletedCoursesNumber] =
        useState<number>(0)
    const [cummulativeGPA, setCummulativeGPA] = useState<number>(0)
    const [currentCourses, setCurrentCourses] = useState<string[]>([])
    const [projectedCummulativeGPA, setProjectedCummulativeGPA] =
        useState<number>(0)

    const setSection = (add: boolean) => {
        if (add) {
            setBackwardSectionMove(false)
            setSectionIndex((prevState: SectionNumbers): SectionNumbers => {
                if (prevState == 0) {
                    return 1
                } else if (prevState == 1) {
                    return 2
                } else if (prevState == 2) {
                    return 3
                } else if (prevState == 3) {
                    return 4
                } else if (prevState == 4) {
                    return 4
                } else {
                    return 0
                }
            })
        } else {
            setBackwardSectionMove(true)
            setSectionIndex((prevState: SectionNumbers): SectionNumbers => {
                if (prevState == 1) {
                    return 0
                } else if (prevState == 2) {
                    return 1
                } else if (prevState == 3) {
                    return 2
                } else if (prevState == 4) {
                    return 3
                } else {
                    return 0
                }
            })
        }
    }
    return (
        <div className="my-4 mx-20 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:tracking-tight">
            <h2 className="text-center text-3xl my-10 mb-20 font-extrabold tracking-wide">
                Get Started...
            </h2>
            <div className="relative">
                <AnimatePresence>
                    {sectionIndex == 0 && (
                        <StartingDiv
                            backwardMove={backwardSectionMove}
                            key={"major"}
                        >
                            <h3>What's your major?</h3>
                        </StartingDiv>
                    )}{" "}
                    {sectionIndex == 1 && (
                        <StartingDiv
                            backwardMove={backwardSectionMove}
                            key={"completed_courses"}
                        >
                            <h3>How many courses have you completed?</h3>
                        </StartingDiv>
                    )}{" "}
                    {sectionIndex == 2 && (
                        <StartingDiv
                            backwardMove={backwardSectionMove}
                            key={"GPA"}
                        >
                            <h3>What's your current cummulative GPA?</h3>
                        </StartingDiv>
                    )}{" "}
                    {sectionIndex == 3 && (
                        <StartingDiv
                            backwardMove={backwardSectionMove}
                            key={"current_courses"}
                        >
                            <h3>Select the current courses</h3>
                        </StartingDiv>
                    )}{" "}
                    {sectionIndex == 4 && (
                        <StartingDiv
                            backwardMove={backwardSectionMove}
                            key={"projection"}
                        >
                            <h3>What's your GPA target?</h3>
                        </StartingDiv>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex justify-end py-2 px-10">
                <div className="flex gap-4">
                    <Button
                        variant={"outline"}
                        onClick={() => setSection(false)}
                    >
                        <ArrowLeft />
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => setSection(true)}
                    >
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default page
