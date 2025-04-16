"use client"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import {
    currentCoursesList,
    breakdownPresets,
    BreakdownSpecsType,
    PresetIdType,
} from "@/functions/data"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Check } from "lucide-react"
import Link from "next/link"
import {
    TypeOfAssessmentType,
    AuthKey,
    CourseType,
    EnrollmentType,
    MeType,
    TypeOfAssessment,
    ScoresType,
} from "@/functions/functions"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface AuthStatus {
    isAuthenticated: boolean
    redirectUrl?: string
}

const Page = () => {
    const [token, setToken] = useState<string | null>(null)
    const [meData, setMeData] = useState<MeType>()
    const [courseData, setCourseData] = useState<CourseType | null>(null)
    const [enrollmentData, setEnrollmentData] = useState<EnrollmentType | null>(
        null
    )
    const [assessmentTypes, setAssessmentTypes] = useState<
        TypeOfAssessmentType[] | null
    >()
    const [selectedAssessmentType, setSelectedAssessmentType] = useState<
        string | null
    >()
    const [selectedAssessmentForMarks, setSelectedAssessmentForMarks] =
        useState<number | null>()
    const [selectedMarksAchieved, setSelectedMarksAchieved] = useState<
        number | null
    >()
    const [selectedWeight, setSelectedWeight] = useState<number | null>()
    const [selectedMarks, setSelectedMarks] = useState<number | null>()
    const [courseAssessments, setCourseAssessments] = useState<
        TypeOfAssessment[] | null
    >()
    const [courseScores, setCourseScores] = useState<ScoresType[] | null>()

    const [currentPreset, setCurrentPreset] = useState<
        PresetIdType | undefined
    >()
    const [currentResultID, setCurrentResultID] = useState<number | undefined>()
    const [currentBreakdownSpecs, setCurrentBreakdownSpecs] = useState<
        BreakdownSpecsType | undefined
    >()
    const params = useParams<{ id: string }>()
    const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null)
    const [isLoading, setIsLoading] = useState(true)
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
                const response = await fetch("/api/auth/key")
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
                    const response = await fetch(
                        "https://gpa-system.onrender.com/api/students/me",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    if (!response.ok) {
                        const errorMessage = `HTTP error! status: ${response.status}`
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
                        const errorMessage = `HTTP error! status: ${response.status}`
                        throw new Error(errorMessage)
                    }
                    const jsonData: CourseType[] = await response.json()
                    const courseHandled = jsonData.find(
                        (x) => x.course_code == params.id.replace("%20", " ")
                    )
                    console.log("Course Handled:", courseHandled)
                    if (courseHandled) {
                        setCourseData(courseHandled)
                    }
                    console.log("Gotten course")
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message)
                }
            }
        }

        fetchCourses()
    }, [token, params])

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                console.log("Trying to get enrollments")
                if (token) {
                    const response = await fetch(
                        "https://gpa-system.onrender.com/api/enrollments/",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    if (!response.ok) {
                        const errorMessage = `HTTP error! status: ${response.status}`
                        throw new Error(errorMessage)
                    }
                    const jsonData: EnrollmentType[] = await response.json()
                    const pageEnrollment: EnrollmentType | undefined =
                        jsonData.find((x) => {
                            return (
                                x.student == meData?.id &&
                                x.course == courseData?.id
                            )
                        })
                    if (pageEnrollment) setEnrollmentData(pageEnrollment)
                    console.log("Gotten enrollment")
                    console.log(pageEnrollment)
                    console.log(meData?.id, courseData?.id)
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message)
                }
            }
        }

        fetchEnrollments()
    }, [token, meData, courseData])

    useEffect(() => {
        const fetchCourseAssessments = async () => {
            try {
                console.log("Trying to get assessments")
                if (token) {
                    const response = await fetch(
                        "https://gpa-system.onrender.com/api/assessments/",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    if (!response.ok) {
                        const errorMessage = `HTTP error! status: ${response.status}`
                        throw new Error(errorMessage)
                    }
                    const jsonData: TypeOfAssessment[] = await response.json()
                    const filteredCourseData = jsonData.filter((assessment) => {
                        return assessment.course == courseData?.id
                    })
                    if (filteredCourseData.length)
                        setCourseAssessments(filteredCourseData)
                    console.log("Gotten assessment")
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message)
                }
            }
        }

        fetchCourseAssessments()
    }, [token, courseData])

    useEffect(() => {
        const fetchCourseAssessments = async () => {
            try {
                console.log("Trying to get scores")
                if (token) {
                    const response = await fetch(
                        "https://gpa-system.onrender.com/api/scores/",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    if (!response.ok) {
                        const errorMessage = `HTTP error! status: ${response.status}`
                        throw new Error(errorMessage)
                    }
                    const jsonData: ScoresType[] = await response.json()
                    if (jsonData) setCourseScores(jsonData)
                    console.log("Gotten assessment")
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message)
                }
            }
        }

        fetchCourseAssessments()
    }, [token, courseData])

    useEffect(() => {
        const fetchAssessmentTypes = async () => {
            try {
                console.log("Trying to get enrollments")
                if (token) {
                    const response = await fetch(
                        "https://gpa-system.onrender.com/assessment-types/",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    if (!response.ok) {
                        const errorMessage = `HTTP error! status: ${response.status}`
                        throw new Error(errorMessage)
                    }
                    const jsonData: TypeOfAssessmentType[] =
                        await response.json()
                    if (jsonData) setAssessmentTypes(jsonData)
                    console.log("Gotten assessment types")
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message)
                }
            }
        }

        fetchAssessmentTypes()
    }, [token, meData, courseData])

    useEffect(() => {
        const courseFromList = currentCoursesList.find(
            (x) => x.course_id == params.id
        )
        setCurrentPreset(courseFromList?.preset_id)
        setCurrentResultID(courseFromList?.result_id)

        const breakdown = breakdownPresets.find(
            (x) => x.preset_id == currentPreset
        )
        setCurrentBreakdownSpecs(breakdown?.breakdown_specs)
    }, [params, currentPreset, currentBreakdownSpecs, currentResultID])

    const handleAssessmentAdd = async () => {
        try {
            const response = await fetch(
                "https://gpa-system.onrender.com/api/assessments/",
                {
                    method: "POST",
                    body: JSON.stringify({
                        course: courseData?.id,
                        assessment_type: selectedAssessmentType,
                        weight: selectedWeight,
                        total_marks: selectedMarks,
                    }),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            if (!response.ok) {
                console.log(`Not posted assessment`)
            } else {
                console.log(`Successfully posted assessment`)
                router.refresh()
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error()
            }
        }
    }

    const handleMarksAdd = async () => {
        try {
            if (
                meData?.id &&
                selectedAssessmentForMarks &&
                selectedMarksAchieved
            ) {
                const response = await fetch(
                    "https://gpa-system.onrender.com/api/scores/",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            student: meData?.id,
                            assessment: selectedAssessmentForMarks,
                            marks_obtained: selectedMarksAchieved,
                        }),
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                if (!response.ok) {
                    console.log(`Not posted marks`)
                } else {
                    console.log(`Successfully posted marks`)
                    router.refresh()
                }
            } else {
                console.log("Data not present")
                console.log(selectedAssessmentForMarks)
                console.log(selectedMarksAchieved)
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error()
            }
        }
    }

    if (isLoading) {
        return <p>Checking authentication...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    if (!enrollmentData) {
        return <p>No Enrollment Data</p>
    }

    if (!authStatus?.isAuthenticated) {
        return <p>Auth status authentication problem</p>
    }

    if (enrollmentData && authStatus?.isAuthenticated) {
        return (
            <>
                <h2>
                    {courseData?.course_code}: {courseData?.course_name}
                </h2>
                <div className="px-4 w-[25rem] mx-auto mt-10">
                    <h3 className="text-xl font-bold">Breakdown</h3>
                    <div className="mt-6">
                        <div className="flex flex-row justify-between">
                            <div>Assessment type</div>
                            <div>Marks</div>
                            <div>Total marks</div>
                            <div>Weight</div>
                        </div>
                        {courseAssessments?.map((assessment) => {
                            return (
                                <div
                                    key={assessment.id}
                                    className="flex flex-row justify-between"
                                >
                                    <div>{assessment.assessment_type}</div>
                                    <div>
                                        {
                                            courseScores?.find(
                                                (x) =>
                                                    x.assessment ==
                                                    assessment.id
                                            )?.marks_obtained
                                        }
                                    </div>
                                    <div>{assessment.total_marks}</div>
                                    <div>{assessment.weight}</div>
                                </div>
                            )
                        })}
                    </div>
                    <Dialog>
                        <DialogTrigger className="text-center flex flex-col gap-2 items-center">
                            <div className="mt-4 rounded-lg px-3 py-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground duration-100 **:duration-100">
                                Add assessment
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <Select
                                onValueChange={(e) =>
                                    setSelectedAssessmentType(e)
                                }
                            >
                                <SelectTrigger className="w-[250px]">
                                    <SelectValue placeholder="Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    {assessmentTypes?.map((type) => {
                                        return (
                                            <SelectItem
                                                value={type.value}
                                                key={type.value}
                                            >
                                                {type.label}
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                            <p>{"Weight (out of the total 100)"}</p>
                            <Input
                                className="w-fit"
                                type="number"
                                min={1}
                                max={40}
                                onChange={(e) =>
                                    setSelectedWeight(
                                        Number(e.currentTarget.value)
                                    )
                                }
                            />
                            <p>Total marks</p>
                            <Input
                                className="w-fit"
                                type="number"
                                min={1}
                                max={40}
                                onChange={(e) =>
                                    setSelectedMarks(
                                        Number(e.currentTarget.value)
                                    )
                                }
                            />
                            <DialogClose>
                                <Button
                                    className="block my-2 ml-auto bg-success text-success-foreground"
                                    onClick={handleAssessmentAdd}
                                >
                                    Submit
                                </Button>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger className="text-center flex flex-col gap-2 items-center">
                            <div className="mt-4 rounded-lg px-3 py-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground duration-100 **:duration-100">
                                Add marks
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <Select
                                onValueChange={(e) =>
                                    setSelectedAssessmentForMarks(Number(e))
                                }
                            >
                                <SelectTrigger className="w-[250px]">
                                    <SelectValue placeholder="Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courseAssessments?.map((ass) => {
                                        return (
                                            <SelectItem
                                                value={String(ass.id)}
                                                key={ass.id}
                                            >
                                                {ass.assessment_type}
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                            <p>{`Marks (out of the total ${
                                courseAssessments?.find(
                                    (x) => x.id == selectedAssessmentForMarks
                                )?.total_marks
                            })`}</p>
                            <Input
                                className="w-fit"
                                type="number"
                                min={1}
                                max={40}
                                onChange={(e) =>
                                    setSelectedMarksAchieved(
                                        Number(e.currentTarget.value)
                                    )
                                }
                            />
                            <DialogClose>
                                <Button
                                    className="block my-2 ml-auto bg-success text-success-foreground"
                                    onClick={handleMarksAdd}
                                >
                                    Submit
                                </Button>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                    <Link
                        className="block w-fit my-4 ml-auto cursor-pointer"
                        href="/dashboard"
                    >
                        <Button className="bg-success text-success-foreground cursor-pointer mt-4">
                            Done <Check className="inline" />
                        </Button>
                    </Link>
                </div>
            </>
        )
    } else {
        return <p>Loading course information...</p>
    }
}

export default Page
