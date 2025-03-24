"use client"
import StartingDiv from "@/components/Elements/StartingDiv"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Trash, Trash2, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import React, { useState } from "react"
import { MultiSelect, Option } from "@/components/Forms/MultiSelect"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { courseList, majorList, majorCourseList } from "@/functions/data"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"

const fruits: Option[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
    { value: "grapes", label: "Grapes" },
    { value: "pineapple", label: "Pineapple" },
    { value: "strawberry", label: "Strawberry" },
    { value: "watermelon", label: "Watermelon" },
]

// select major
// enter no. of courses completed
// select current cummulative gpa
// select current courses
// input projection (optional)

type SectionNumbers = 0 | 1 | 2 | 3 | 4

const page = () => {
    const [backwardSectionMove, setBackwardSectionMove] =
        useState<boolean>(false)
    const [sectionIndex, setSectionIndex] = useState<SectionNumbers>(0)
    const [selectedMajor, setSelectedMajor] = useState<string | null>()
    const [completedCoursesNumber, setCompletedCoursesNumber] =
        useState<number>(0)
    const [cummulativeGPA, setCummulativeGPA] = useState<number>(0)
    const [currentCourses, setCurrentCourses] = useState<string[]>([])
    const [projectedCummulativeGPA, setProjectedCummulativeGPA] =
        useState<number>(0)
    const [selectedFruits, setSelectedFruits] = useState<string[]>(["apple"])

    const router = useRouter()

    const setSection = (add: boolean) => {
        if (add) {
            setBackwardSectionMove(false)
            setSectionIndex((prevState: SectionNumbers): SectionNumbers => {
                if (prevState == 0) {
                    if (selectedMajor) return 1
                    else return 0
                } else if (prevState == 1) {
                    if (completedCoursesNumber) return 2
                    else return 1
                } else if (prevState == 2) {
                    if (cummulativeGPA) return 3
                    else return 2
                } else if (prevState == 3) {
                    if (currentCourses) return 4
                    else return 3
                } else if (prevState == 4) {
                    if (projectedCummulativeGPA) {
                        router.push("/dashboard")
                        return 4
                    } else return 4
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

    const handleCurrentCoursesSelection = (value: string) => {
        setCurrentCourses((prevState) => {
            return [...prevState, value]
        })
    }

    const deleteCurrentCourse = (id: string) => {
        setCurrentCourses(prevState => {
            return prevState.filter(x => x != id)
        })
    }
    return (
        <div className="my-4 mx-20 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:mb-2">
            <h2 className="text-center text-3xl my-10 font-extrabold tracking-wide">
                Get Started...
            </h2>
            <div className="flex justify-center pb-2 px-10">
                <div className="flex flex-row gap-2 justify-center items-center w-full pb-2 px-5 mr-8 mb-4">
                    <div
                        className={`text-lg font-mono font-bold ${
                            sectionIndex < 0 ? "opacity-50" : "opacity-100"
                        }`}
                    >
                        Major
                    </div>
                    <div className="h-1 w-20 bg-slate-200 relative overflow-hidden rounded-sm">
                        <motion.div
                            className="h-full w-[120%] absolute bg-foreground"
                            initial={{ left: "-130%" }}
                            animate={{
                                left: sectionIndex < 1 ? "-130%" : "-20%",
                                transition: {
                                    default: {
                                        type: "spring",
                                        stiffness: 50,
                                        bounce: 0.05,
                                    },
                                    duration: 0.1,
                                },
                            }}
                        ></motion.div>
                    </div>
                    <div
                        className={`text-lg font-mono font-bold ${
                            sectionIndex < 1 ? "opacity-50" : "opacity-100"
                        }`}
                    >
                        Progress
                    </div>
                    <div className="h-1 w-20 bg-slate-200 relative overflow-hidden rounded-sm">
                        <motion.div
                            className="h-full w-[120%] absolute bg-foreground"
                            initial={{ left: "-130%" }}
                            animate={{
                                left: sectionIndex < 2 ? "-130%" : "-20%",
                                transition: {
                                    default: {
                                        type: "spring",
                                        stiffness: 50,
                                        bounce: 0.05,
                                    },
                                    duration: 0.1,
                                },
                            }}
                        ></motion.div>
                    </div>
                    <div
                        className={`text-lg font-mono font-bold ${
                            sectionIndex < 2 ? "opacity-50" : "opacity-100"
                        }`}
                    >
                        GPA
                    </div>
                    <div className="h-1 w-20 bg-slate-200 relative overflow-hidden rounded-sm">
                        <motion.div
                            className="h-full w-[120%] absolute bg-foreground"
                            initial={{ left: "-130%" }}
                            animate={{
                                left: sectionIndex < 3 ? "-130%" : "-20%",
                                transition: {
                                    default: {
                                        type: "spring",
                                        stiffness: 50,
                                        bounce: 0.05,
                                    },
                                    duration: 0.1,
                                },
                            }}
                        ></motion.div>
                    </div>
                    <div
                        className={`text-lg font-mono font-bold ${
                            sectionIndex < 3 ? "opacity-50" : "opacity-100"
                        }`}
                    >
                        Courses
                    </div>
                    <div className="h-1 w-20 bg-slate-200 relative overflow-hidden rounded-sm">
                        <motion.div
                            className="h-full w-[120%] absolute bg-foreground"
                            initial={{ left: "-130%" }}
                            animate={{
                                left: sectionIndex < 4 ? "-130%" : "-20%",
                                transition: {
                                    default: {
                                        type: "spring",
                                        stiffness: 50,
                                        bounce: 0.05,
                                    },
                                    duration: 0.1,
                                },
                            }}
                        ></motion.div>
                    </div>
                    <div
                        className={`text-lg font-mono font-bold ${
                            sectionIndex < 4 ? "opacity-50" : "opacity-100"
                        }`}
                    >
                        Projection
                    </div>
                </div>
            </div>
            <div className="relative">
                <AnimatePresence>
                    {sectionIndex == 0 && (
                        <StartingDiv
                            backwardMove={backwardSectionMove}
                            key={"major"}
                            setSection={setSection}
                        >
                            <h3>What's your major?</h3>
                            <Select
                                value={
                                    selectedMajor ? selectedMajor : undefined
                                }
                                onValueChange={(value) =>
                                    setSelectedMajor(value)
                                }
                            >
                                <SelectTrigger className="w-[250px]">
                                    <SelectValue placeholder="Major" />
                                </SelectTrigger>
                                <SelectContent>
                                    {majorList.map((major) => {
                                        return (
                                            <SelectItem
                                                value={String(major.major_id)}
                                                key={String(major.major_id)}
                                            >
                                                {major.majorName}
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                            {/* <div className="space-y-2">
                                <label
                                    htmlFor="fruits"
                                    className="text-sm font-medium"
                                >
                                    Select Fruits
                                </label>
                                <MultiSelect
                                    options={fruits}
                                    selected={selectedFruits}
                                    onChange={setSelectedFruits}
                                    placeholder="Select fruits..."
                                />
                            </div>

                            {selectedFruits.length > 0 && (
                                <div className="rounded-md bg-muted p-4">
                                    <h2 className="mb-2 font-medium">
                                        Selected fruits:
                                    </h2>
                                    <ul className="list-inside list-disc">
                                        {Array.isArray(selectedFruits) &&
                                            selectedFruits.map((fruit) => (
                                                <li key={fruit}>
                                                    {
                                                        fruits.find(
                                                            (f) =>
                                                                f.value ===
                                                                fruit
                                                        )?.label
                                                    }
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )} */}
                        </StartingDiv>
                    )}{" "}
                    {sectionIndex == 1 && (
                        <StartingDiv
                            backwardMove={backwardSectionMove}
                            key={"completed_courses"}
                            setSection={setSection}
                        >
                            <h3>How many courses have you completed?</h3>
                            <Input
                                className="w-fit"
                                type="number"
                                min={0}
                                max={99}
                                step={1}
                                value={
                                    completedCoursesNumber
                                        ? completedCoursesNumber
                                        : undefined
                                }
                                onInput={(e) =>
                                    setCompletedCoursesNumber(
                                        Number(e.currentTarget.value)
                                    )
                                }
                            />
                        </StartingDiv>
                    )}{" "}
                    {sectionIndex == 2 && (
                        <StartingDiv
                            backwardMove={backwardSectionMove}
                            key={"GPA"}
                            setSection={setSection}
                        >
                            <h3>What's your current cummulative GPA?</h3>
                            <Input
                                className="w-fit"
                                type="number"
                                min={0}
                                max={4}
                                step={0.01}
                                value={
                                    cummulativeGPA ? cummulativeGPA : undefined
                                }
                                onInput={(e) =>
                                    setCummulativeGPA(
                                        Number(e.currentTarget.value)
                                    )
                                }
                            />
                        </StartingDiv>
                    )}{" "}
                    {sectionIndex == 3 && (
                        <StartingDiv
                            backwardMove={backwardSectionMove}
                            key={"current_courses"}
                            setSection={setSection}
                        >
                            <h3>Select the current courses</h3>
                            <Select
                                value={undefined}
                                onValueChange={(value) =>
                                    handleCurrentCoursesSelection(value)
                                }
                            >
                                <SelectTrigger className="w-[250px]">
                                    <SelectValue placeholder="Multiple selector" />
                                </SelectTrigger>
                                <SelectContent>
                                    {majorCourseList.map((course) => {
                                        if (
                                            String(course.major_id) ==
                                                selectedMajor &&
                                            !currentCourses.includes(
                                                course.course_id
                                            )
                                        ) {
                                            return (
                                                <SelectItem
                                                    value={course.course_id}
                                                    key={course.course_id}
                                                >
                                                    {
                                                        courseList.find(
                                                            (x) =>
                                                                x.course_id ==
                                                                course.course_id
                                                        )?.courseName
                                                    }
                                                </SelectItem>
                                            )
                                        }
                                    })}
                                </SelectContent>
                            </Select>
                            <div className="my-4 flex flex-col gap-2">
                                {currentCourses.map((course_id) => {
                                    return (
                                        <div className="flex flex-row gap-4 items-center w-fit">
                                            <p>
                                                {course_id}:{" "}
                                                {
                                                    courseList.find((x) => {
                                                        return (
                                                            x.course_id ==
                                                            course_id
                                                        )
                                                    })?.courseName
                                                }
                                            </p>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <div className="rounded-lg px-3 py-2 text-destructive hover:bg-destructive hover:text-destructive-foreground duration-100 [&_*]:duration-100">
                                                        <Trash2 />
                                                    </div>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-80 text-center">
                                                    Are you sure?
                                                    <div className="mt-4 flex flex-row justify-around">
                                                        <PopoverClose>
                                                            <Button
                                                                variant={
                                                                    "destructive"
                                                                }
                                                                onClick={() =>
                                                                    deleteCurrentCourse(
                                                                        course_id
                                                                    )
                                                                }
                                                            >
                                                                Yes
                                                            </Button>
                                                        </PopoverClose>
                                                        <PopoverClose>
                                                            <Button
                                                                variant={
                                                                    "outline"
                                                                }
                                                            >
                                                                No
                                                            </Button>
                                                        </PopoverClose>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    )
                                })}
                            </div>
                        </StartingDiv>
                    )}{" "}
                    {sectionIndex == 4 && (
                        <StartingDiv
                            backwardMove={backwardSectionMove}
                            key={"projection"}
                            setSection={setSection}
                        >
                            <h3>What's your GPA target?</h3>
                            <Input
                                className="w-fit"
                                type="number"
                                min={1}
                                max={4}
                                step={0.01}
                                value={
                                    projectedCummulativeGPA
                                        ? projectedCummulativeGPA
                                        : undefined
                                }
                                onInput={(e) =>
                                    setProjectedCummulativeGPA(
                                        Number(e.currentTarget.value)
                                    )
                                }
                            />
                        </StartingDiv>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default page
