"use client"
import StartingDiv from "@/components/Elements/StartingDiv"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import React, { useEffect, useState } from "react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import {
    AuthKey,
    MeType,
    validCoursesNumber,
    validGPA,
} from "@/functions/functions"

interface AuthStatus {
    isAuthenticated: boolean
    redirectUrl?: string
}
interface MajorDataType {
    id: number
    name: string
}
interface CourseDataType {
    id: number
    course_code: string
    course_name: string
    credit_hours: number
    major: number
}

// select major
// enter no. of courses completed
// select current cummulative gpa
// select current courses
// input projection (optional)

type SectionNumbers = 0 | 1 | 2 | 3 | 4 | 5

const Page = () => {
    const [token, setToken] = useState<string | null>(null)
    const [meData, setMeData] = useState<MeType>()
    const [backwardSectionMove, setBackwardSectionMove] =
        useState<boolean>(false)
    const [sectionIndex, setSectionIndex] = useState<SectionNumbers>(0)
    const [majorData, setMajorData] = useState<MajorDataType[] | null>(null)
    const [courseData, setCourseData] = useState<CourseDataType[] | null>(null)
    const [selectedStudentNumber, setSelectedStudentNumber] = useState<
        number | null
    >()
    const [selectedMajor, setSelectedMajor] = useState<number | null>()
    const [completedCoursesNumber, setCompletedCoursesNumber] =
        useState<number>(0)
    const [cummulativeGPA, setCummulativeGPA] = useState<number>(0)
    const [currentCourses, setCurrentCourses] = useState<number[]>([])
    const [projectedCummulativeGPA, setProjectedCummulativeGPA] =
        useState<number>(0)
    const [currentSemester, setCurrentSemester] = useState<string>()
    const [enrolledCreditHours, setEnrolledCreditHours] = useState<number>()
    const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    useEffect(() => {
        async function fetchAuthStatus() {
            try {
                const response = await fetch("/api/auth/status")
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data: AuthStatus = await response.json()
                setAuthStatus(data)
                setIsLoading(false)

                // Client-side redirect if not authenticated and redirect URL is present
                if (!data.isAuthenticated && data.redirectUrl) {
                    router.push(data.redirectUrl)
                } else if (!data.isAuthenticated) {
                    router.push("/")
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message)
                    setIsLoading(false)
                }
            }
        }

        fetchAuthStatus()
    }, [router])

    useEffect(() => {
        async function getAuthToken() {
            try {
                const response: Response = await fetch("/api/auth/key")
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data: AuthKey = await response.json()
                if (data.token) {
                    setToken(data.token)
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message)
                }
            }
        }

        getAuthToken()
    }, [])

    useEffect(() => {
        const fetchMeData = async () => {
            try {
                console.log("Trying to get student data")
                if (token) {
                    const response: Response = await fetch(
                        "https://gpa-system.onrender.com/api/students/me",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    if (!response.ok) {
                        const errorMessage: string = `HTTP error! status: ${response.status}`
                        throw new Error(errorMessage)
                    }
                    const jsonData = await response.json()
                    setMeData(jsonData)
                    console.log("Gotten student data")
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message)
                }
            }
        }

        fetchMeData()
    }, [token])

    useEffect(() => {
        const fetchMajors = async () => {
            try {
                console.log("Trying to get majors")
                if (token) {
                    const response = await fetch(
                        "https://gpa-system.onrender.com/api/majors/",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    if (!response.ok) {
                        const errorMessage: string = `HTTP error! status: ${response.status}`
                        throw new Error(errorMessage)
                    }
                    const jsonData = await response.json()
                    setMajorData(jsonData)
                    console.log("Gotten majors")
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message)
                }
            }
        }

        fetchMajors()
    }, [token])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                console.log("Trying to get courses")
                if (token) {
                    const response = await fetch(
                        "https://gpa-system.onrender.com/api/courses/",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    if (!response.ok) {
                        const errorMessage: string = `HTTP error! status: ${response.status}`
                        throw new Error(errorMessage)
                    }
                    const jsonData = await response.json()
                    setCourseData(jsonData)
                    console.log("Gotten courses")
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message)
                }
            }
        }

        fetchCourses()
    }, [token])

    const handleSubmission = async () => {
        const jsonStudentData = {
            student_number: selectedStudentNumber,
            major: selectedMajor,
            cumulative_gpa: cummulativeGPA,
            total_credit_hours: completedCoursesNumber * 3,
        }
        try {
            const response = await fetch(
                "https://gpa-system.onrender.com/api/students/me/",
                {
                    method: "PATCH",
                    body: JSON.stringify(jsonStudentData),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            if (response.ok) {
                if (meData) {
                    currentCourses.forEach(async (course_id) => {
                        const response = await fetch(
                            "https://gpa-system.onrender.com/api/enrollments/",
                            {
                                method: "POST",
                                body: JSON.stringify({
                                    student: meData.id,
                                    course: course_id,
                                }),
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        )
                        if (!response.ok) {
                            console.log(`Not posted course ${course_id}`)
                        } else {
                            console.log(
                                `Successfully posted course ${course_id}`
                            )
                        }
                    })
                    const response = await fetch(
                        "https://gpa-system.onrender.com/api/projections/",
                        {
                            method: "POST",
                            body: JSON.stringify({
                                student: meData.id,
                                semester: currentSemester,
                                desired_semester_gpa: projectedCummulativeGPA,
                                total_credit_hours: enrolledCreditHours,
                            }),
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    if (!response.ok) {
                        console.log(`Not posted projection`)
                    } else {
                        console.log(`Successfully posted projection`)
                    }
                }
                router.push("/dashboard")
            } else {
                console.log("not response ok!")
            }
        } catch (error) {
            console.error("Error writing data:", error)
        }
        return
    }

    const setSection = (add: boolean) => {
        if (add) {
            setBackwardSectionMove(false)
            setSectionIndex((prevState: SectionNumbers): SectionNumbers => {
                if (prevState == 0) {
                    if (selectedStudentNumber) return 1
                    else return 0
                } else if (prevState == 1) {
                    if (selectedMajor) return 2
                    else return 1
                } else if (prevState == 2) {
                    if (
                        completedCoursesNumber &&
                        validCoursesNumber(completedCoursesNumber)
                    )
                        return 3
                    else return 2
                } else if (prevState == 3) {
                    if (cummulativeGPA && validGPA(cummulativeGPA)) return 4
                    else return 3
                } else if (prevState == 4) {
                    if (currentCourses) return 5
                    else return 4
                } else if (prevState == 5) {
                    if (
                        projectedCummulativeGPA &&
                        validGPA(projectedCummulativeGPA) &&
                        currentSemester &&
                        enrolledCreditHours
                    ) {
                        handleSubmission()
                        return 5
                    } else return 5
                } else {
                    return 1
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
                } else if (prevState == 5) {
                    return 4
                } else {
                    return 1
                }
            })
        }
    }

    const handleCurrentCoursesSelection = (value: number) => {
        setCurrentCourses((prevState) => {
            return [...prevState, value]
        })
    }

    const deleteCurrentCourse = (id: number) => {
        setCurrentCourses((prevState) => {
            return prevState.filter((x) => x != id)
        })
    }

    if (isLoading) {
        return <p>Checking authentication...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    if (authStatus) {
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
                            Student No.
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
                            Major
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
                            Progress
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
                            GPA
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
                            Courses
                        </div>
                        <div className="h-1 w-20 bg-slate-200 relative overflow-hidden rounded-sm">
                            <motion.div
                                className="h-full w-[120%] absolute bg-foreground"
                                initial={{ left: "-130%" }}
                                animate={{
                                    left: sectionIndex < 5 ? "-130%" : "-20%",
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
                                sectionIndex < 5 ? "opacity-50" : "opacity-100"
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
                                key={"student_number"}
                                setSection={setSection}
                            >
                                <h3>{"What's your student number?"}</h3>
                                <Input
                                    className="w-fit"
                                    type="number"
                                    min={100000}
                                    max={999999}
                                    step={1}
                                    value={
                                        selectedStudentNumber
                                            ? selectedStudentNumber
                                            : undefined
                                    }
                                    onInput={(e) =>
                                        setSelectedStudentNumber(
                                            Number(e.currentTarget.value)
                                        )
                                    }
                                />
                            </StartingDiv>
                        )}
                        {sectionIndex == 1 && (
                            <StartingDiv
                                backwardMove={backwardSectionMove}
                                key={"major"}
                                setSection={setSection}
                            >
                                <h3>{"What's your major?"}</h3>
                                <Select
                                    value={
                                        selectedMajor
                                            ? String(selectedMajor)
                                            : undefined
                                    }
                                    onValueChange={(value) =>
                                        setSelectedMajor(Number(value))
                                    }
                                >
                                    <SelectTrigger className="w-[250px]">
                                        <SelectValue placeholder="Major" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {majorData &&
                                            majorData.map((major) => {
                                                return (
                                                    <SelectItem
                                                        value={String(major.id)}
                                                        key={String(major.id)}
                                                    >
                                                        {major.name}
                                                    </SelectItem>
                                                )
                                            })}
                                    </SelectContent>
                                </Select>
                            </StartingDiv>
                        )}{" "}
                        {sectionIndex == 2 && (
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
                        {sectionIndex == 3 && (
                            <StartingDiv
                                backwardMove={backwardSectionMove}
                                key={"GPA"}
                                setSection={setSection}
                            >
                                <h3>
                                    {"What's your current cummulative GPA?"}
                                </h3>
                                <Input
                                    className="w-fit"
                                    type="number"
                                    min={0}
                                    max={4}
                                    step={0.01}
                                    value={
                                        cummulativeGPA
                                            ? cummulativeGPA
                                            : undefined
                                    }
                                    onInput={(e) =>
                                        setCummulativeGPA(
                                            Number(e.currentTarget.value)
                                        )
                                    }
                                />
                            </StartingDiv>
                        )}{" "}
                        {sectionIndex == 4 && (
                            <StartingDiv
                                backwardMove={backwardSectionMove}
                                key={"current_courses"}
                                setSection={setSection}
                            >
                                <h3>Select the current courses</h3>
                                <Select
                                    value={undefined}
                                    onValueChange={(value) =>
                                        handleCurrentCoursesSelection(
                                            Number(value)
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-[250px]">
                                        <SelectValue placeholder="Multiple selector" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courseData &&
                                            courseData.map((course) => {
                                                if (
                                                    course.major ==
                                                        selectedMajor &&
                                                    !currentCourses.includes(
                                                        course.id
                                                    )
                                                ) {
                                                    return (
                                                        <SelectItem
                                                            value={String(
                                                                course.id
                                                            )}
                                                            key={course.id}
                                                        >
                                                            {
                                                                courseData.find(
                                                                    (x) =>
                                                                        x.id ==
                                                                        course.id
                                                                )?.course_name
                                                            }
                                                        </SelectItem>
                                                    )
                                                } else {
                                                    console.log(
                                                        `Course Major: ${course.major}, selected major: ${selectedMajor}`
                                                    )
                                                }
                                            })}
                                    </SelectContent>
                                </Select>
                                <div className="my-4 flex flex-col gap-2">
                                    {currentCourses.map((course_id) => {
                                        return (
                                            <div
                                                key={course_id}
                                                className="flex flex-row gap-4 items-center w-fit"
                                            >
                                                <p>
                                                    {(() => {
                                                        const foundCourse =
                                                            courseData?.find(
                                                                (x) =>
                                                                    x.id ==
                                                                    course_id
                                                            )
                                                        return foundCourse
                                                            ? `${foundCourse.course_code}: ${foundCourse.course_name}`
                                                            : "Course not found"
                                                    })()}
                                                </p>
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <div className="rounded-lg px-3 py-2 text-destructive hover:bg-destructive hover:text-destructive-foreground duration-100 **:duration-100">
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
                        {sectionIndex == 5 && (
                            <StartingDiv
                                backwardMove={backwardSectionMove}
                                key={"projection"}
                                setSection={setSection}
                            >
                                <h3>{"What's your GPA target?"}</h3>
                                <Input
                                    className="w-fit mb-2"
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
                                <h3>Current semester:</h3>
                                <Input
                                    className="w-fit"
                                    type="text"
                                    size={15}
                                    step={1}
                                    placeholder="season/year"
                                    value={
                                        currentSemester
                                            ? currentSemester
                                            : undefined
                                    }
                                    onInput={(e) =>
                                        setCurrentSemester(
                                            e.currentTarget.value
                                        )
                                    }
                                />
                                <h3>Credit hours:</h3>
                                <Input
                                    className="w-fit mb-2"
                                    type="number"
                                    min={3}
                                    max={30}
                                    step={1}
                                    value={
                                        enrolledCreditHours
                                            ? enrolledCreditHours
                                            : undefined
                                    }
                                    onInput={(e) =>
                                        setEnrolledCreditHours(
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
    } else {
        ;<></>
    }
}

export default Page
