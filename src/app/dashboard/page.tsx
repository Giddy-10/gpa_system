import React from "react"

import Link from "next/link"
import DashboardProjectionEdit from "@/components/Forms/DashboardProjectionEdit"
import { Goal, GraduationCap, LineChart, Link as LinkIcon } from "lucide-react"
import { checkAuthStatus, getAuthToken } from "@/app/lib/auth"
import { redirect } from "next/navigation"
import {
    EnrollmentType,
    MajorType,
    CourseType,
    ProjectionType,
    MeType,
} from "@/functions/functions"

const page = async () => {
    const { isAuthenticated } = await checkAuthStatus()
    if (!isAuthenticated) {
        redirect("/")
    }

    const { token } = await getAuthToken()
    const res = await fetch(
        "https://gpa-system.onrender.com/api/projections/",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data")
    }
    console.log(res.json())

    const meData = await fetch(
        "https://gpa-system.onrender.com/api/students/me/",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    const meInfo: MeType = await meData.json()

    const majorData = await fetch(
        "https://gpa-system.onrender.com/api/majors/",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    const majorInfo: MajorType[] = await majorData.json()

    const courseData = await fetch(
        "https://gpa-system.onrender.com/api/courses/",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    const courseInfo: CourseType[] = await courseData.json()

    const enrollmentData = await fetch(
        "https://gpa-system.onrender.com/api/enrollments/",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    const enrollmentInfo: EnrollmentType[] = await enrollmentData.json()

    const projectionData = await fetch(
        "https://gpa-system.onrender.com/api/projections/",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    const projectionInfo: ProjectionType[] = await projectionData.json()
    if (!projectionInfo.find((x) => x.id == meInfo.id)?.desired_semester_gpa) redirect("/get-started")
        return (
            <div>
                {/* <h2>Dashboard</h2> */}
                <div className="px-2 *:border-foreground *:border-dotted mt-8">
                    <div className="grid grid-cols-3 *:border-dotted *:border-inherit">
                        <div className="border-l-2 border-t-2 rounded-tl-lg"></div>
                        <div className="border-2 border-t-0 bg-background text-center text-3xl font-bold tracking-tight rounded-b-xl">
                            {meInfo.user.email.split("@")[0]}
                        </div>
                        <div className="border-r-2 border-t-2 rounded-tr-lg"></div>
                    </div>
                    <div className="border-2 border-t-0 rounded-b-lg pt-8 p-4 grid grid-cols-2 md:grid-cols-3 gap-6 *:rounded-md *:p-4 *:not-[.no-bg]:shadow-lg *:not-[.no-bg]:bg-linear-50 *:not-[.no-bg]:from-slate-100 *:not-[.no-bg]:via-slate-50 *:not-[.no-bg]:nth-of-type-[5n]:from-fuchsia-200 *:not-[.no-bg]:nth-of-type-[5n]:via-fuchsia-100 *:not-[.no-bg]:nth-of-type-[5n-1]:from-orange-200 *:not-[.no-bg]:nth-of-type-[5n-1]:via-orange-100 *:not-[.no-bg]:nth-of-type-[5n-3]:from-sky-200 *:not-[.no-bg]:nth-of-type-[5n-3]:via-sky-100 *:not-[.no-bg]:nth-of-type-[5n-4]:from-green-200 *:not-[.no-bg]:nth-of-type-[5n-4]:via-green-100 *:not-[.no-bg]:via-35% *:not-[.no-bg]:to-transparent">
                        <div className="grid items-center grid-flow-col">
                            <div className="w-[20%]">
                                <Goal size={50} />
                            </div>
                            <div>
                                <div className="my-2 flex flex-row justify-between w-full">
                                    <p>Projected GPA:</p>
                                    <p className="text-2xl font-bold mt-1">
                                        {
                                            projectionInfo.find(
                                                (x) => x.id == meInfo.id
                                            )?.desired_semester_gpa
                                        }
                                    </p>
                                </div>
                                <DashboardProjectionEdit />
                            </div>
                        </div>
                        <div className="px-8 flex flex-col justify-center h-full">
                            <div className="my-2 grid grid-flow-col items-center">
                                <div className="w-[20%]">
                                    <GraduationCap size={40} />
                                </div>
                                <div>
                                    <p>Major:</p>
                                    <p className="w-fit mt-2 mb-4 ml-auto text-2xl font-bold">
                                        {majorInfo
                                            ? majorInfo.find(
                                                  (x) => x.id == meInfo.major
                                              )?.name
                                            : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row-span-2 shadow-xl border no-bg bg-linear-50 from-gray-200 via-gray-100 via-35% to-transparent">
                            <div>
                                {enrollmentInfo
                                    ? enrollmentInfo.map((xCourse) => {
                                          if (xCourse.student != meInfo.id) {
                                              return ""
                                          }
                                          const currentCourse = courseInfo.find(
                                              (x) => x.id == xCourse.course
                                          )
                                          if (currentCourse) {
                                              return (
                                                  <div
                                                      key={xCourse.id}
                                                      className="bg-white rounded-md"
                                                  >
                                                      <Link
                                                          className="flex justify-between rounded-sm p-2 my-6 py-4 shadow-xs hover:shadow-lg hover:bg-background apply-transition"
                                                          href={`dashboard/${currentCourse.course_code}`}
                                                      >
                                                          <p>
                                                              {
                                                                  currentCourse.course_code
                                                              }
                                                              :{" "}
                                                              {
                                                                  currentCourse.course_name
                                                              }
                                                          </p>
                                                          <LinkIcon />
                                                      </Link>
                                                  </div>
                                              )
                                          } else {
                                              return ""
                                          }
                                      })
                                    : ""}
                            </div>
                        </div>
                        <div className="px-8 flex flex-row justify-center items-center h-full">
                            <div className="w-[80%]">
                                <LineChart size={50} />
                            </div>
                            <div className="w-full h-full flex flex-col justify-center gap-6">
                                <div>Progress:</div>
                                {projectionInfo.find((x) => x.id == meInfo.id)
                                    ?.is_on_track ? (
                                    <div className="inline py-2 px-4 text-xl font-bold rounded-lg bg-success text-success-foreground w-fit">
                                        Positive
                                    </div>
                                ) : (
                                    <div className="inline py-2 px-4 text-xl font-bold rounded-lg bg-destructive text-destructive-foreground w-fit">
                                        Negative
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="my-4 flex flex-row justify-between w-full">
                                <p>Cummulative GPA:</p>
                                <p className="text-3xl font-bold mt-4">
                                    {meInfo.cumulative_gpa}
                                </p>
                            </div>
                            <div className="my-4 flex flex-row justify-between w-full">
                                <p>Completed courses:</p>
                                <p className="text-3xl font-bold mt-4">
                                    {Math.ceil(meInfo.total_credit_hours / 3)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default page
