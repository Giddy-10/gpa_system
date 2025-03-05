"use client"
import React, { useState } from "react"

// select major
// enter no. of courses completed
// select current cummulative gpa
// select current courses
// input projection (optional)

const page = () => {
    const [sectionIndex, setSectionIndex] = useState<0 | 1 | 2 | 3 | 4>(0)
    const [selectedMajor, setSelectedMajor] = useState<string | null>()
    const [completedCoursesNumber, setCompletedCoursesNumber] =
        useState<number>(0)
    const [cummulativeGPA, setCummulativeGPA] = useState<number>(0)
    const [currentCourses, setCurrentCourses] = useState<string[]>([])
    const [projectedCummulativeGPA, setProjectedCummulativeGPA] =
        useState<number>(0)
    return (
        <div className="my-4 mx-20 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:tracking-tight">
            <h2 className="text-center text-3xl my-10 mb-20 font-extrabold tracking-wide">
                Get Started...
            </h2>
            {sectionIndex == 0 ? (
                <>
                    <h3>What's your major?</h3>
                </>
            ) : sectionIndex == 1 ? (
                <>
                    <h3>How many courses have you completed?</h3>
                </>
            ) : sectionIndex == 2 ? (
                <>
                    <h3>What's your current cummulative GPA?</h3>
                </>
            ) : sectionIndex == 3 ? (
                <>
                    <h3>Select the current courses</h3>
                </>
            ) : sectionIndex == 4 ? (
                <>
                    <h3>What's your GPA target?</h3>
                </>
            ) : null}
        </div>
    )
}

export default page
