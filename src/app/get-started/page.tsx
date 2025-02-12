"use client"
import React, { useState } from "react"

// select major
// enter no. of courses completed
// select current cummulative gpa
// select current courses

const page = () => {
    const [sectionIndex, setSectionIndex] = useState<0 | 1 | 2 | 3>(0)
    const [selectedMajor, setSelectedMajor] = useState<string | null>()
    const [completedCoursesNumber, setCompletedCoursesNumber] =
        useState<number>(0)
    const [cummulativeGPA, setCummulativeGPA] = useState<number>(0)
    const [currentCourses, setCurrentCourses] = useState<string[]>([])
    return (
        <div className="my-4 mx-20 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:tracking-tight">
            <h2 className="text-center text-3xl my-10 mb-20 font-extrabold tracking-wide">
                Get Started...
            </h2>
            {sectionIndex == 0 ? (
                <>
                    <h3>What's your major?</h3>
                </>
            ) : null}
        </div>
    )
}

export default page
