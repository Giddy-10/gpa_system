import React from "react"

import {
    userData,
    courseList,
    majorList,
    currentCoursesList,
} from "@/functions/data"
import Link from "next/link"
import DashboardProjectionEdit from "@/components/Forms/DashboardProjectionEdit"
import { Link as LinkIcon } from "lucide-react"

const page = () => {
    
    return (
        <div>
            <h2>Dashboard</h2>
            <div className="mx-2 grid grid-cols-2 md:grid-cols-3 gap-6 [&>*]:rounded-md [&>*]:p-4 [&>*]:shadow-lg">
                <div>
                    <div className="my-2 flex flex-row justify-between w-full">
                        <p>Cummulative GPA:</p>
                        <p className="text-2xl font-bold mt-1">2.8</p>
                    </div>
                    <div className="my-2 flex flex-row justify-between w-full">
                        <p>Projected GPA:</p>
                        <p className="text-2xl font-bold mt-1">3.2</p>
                    </div>
                    <DashboardProjectionEdit />
                    <div className="my-2 flex flex-row justify-between items-center">
                        <div className="inline">Progress:</div>
                        {userData.positive_progress ? (
                            <div className="inline py-1 px-2 rounded-sm bg-success text-success-foreground">
                                Positive
                            </div>
                        ) : (
                            <div className="inline py-1 px-2 rounded-sm bg-destructive text-destructive-foreground">
                                Negative
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <p>Major:</p>
                    <p className="w-fit mt-2 mb-4 ml-auto text-2xl font-bold">
                        {
                            majorList.find((x) => x.major_id == userData.major)
                                ?.majorName
                        }
                    </p>
                    <p>Completed courses:</p>
                    <p className="w-fit mt-4 ml-auto text-3xl font-bold">21</p>
                </div>
                <div className="row-span-2">
                    <div>
                        {currentCoursesList.map((xCourse) => {
                            const currentCurrentCourse = courseList.find(
                                (x) => x.course_id == xCourse.course_id
                            )
                            if (currentCurrentCourse) {
                                return (
                                    <div key={xCourse.course_id}>
                                        <Link
                                            className="flex justify-between rounded-sm p-2 my-4 shadow-sm hover:shadow-md"
                                            href={`dashboard/${xCourse.course_id}`}
                                        >
                                            <p>{currentCurrentCourse.course_id}:{" "}
                                            {currentCurrentCourse.courseName}</p>
                                            <LinkIcon />

                                        </Link>
                                    </div>
                                )
                            } else {
                                return ""
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
