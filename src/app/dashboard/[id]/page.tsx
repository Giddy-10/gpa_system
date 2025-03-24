"use client"
import { useParams } from "next/navigation"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Button } from "@/components/ui/button"

import {
    userData,
    courseList,
    majorList,
    currentCoursesList,
    CourseType,
    breakdownParams,
    breakdownPresets,
    BreakdownSpecsType,
} from "@/functions/data"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

const page = () => {
    const [selectedCourse, setSelectedCourse] = useState<
        CourseType | undefined
    >()
    const [currentPreset, setCurrentPreset] = useState<number | undefined>()
    const [currentBreakdownSpecs, setCurrentBreakdownSpecs] = useState<
        BreakdownSpecsType | undefined
    >()
    const params = useParams<{ id: string }>()

    useEffect(() => {
        if (selectedCourse == undefined && params.id) {
            setSelectedCourse(courseList.find((x) => x.course_id == params.id))
            setCurrentPreset(
                currentCoursesList.find((x) => x.course_id == params.id)
                    ?.preset_id
            )
        }
        if (currentBreakdownSpecs == undefined) {
            setCurrentBreakdownSpecs(
                breakdownPresets.find((x) => x.preset_id == currentPreset)
                    ?.breakdown_specs
            )
        }
    }, [params, currentPreset])
    if (selectedCourse) {
        return (
            <>
                <h2>
                    {selectedCourse.course_id}: {selectedCourse.courseName}
                </h2>
                <div className="px-4 w-[25rem]">
                    <h3 className="text-xl font-bold">Breakdown</h3>
                    {currentBreakdownSpecs &&
                        Object.keys(currentBreakdownSpecs).map((x) => {
                            const currentBreakdown = breakdownParams.find(
                                (breakdown) =>
                                    breakdown.breakdown_id == Number(x)
                            )
                            if (currentBreakdownSpecs[Number(x)] == 0) {
                                return ""
                            } else {
                                return (
                                    <div className="my-2 flex flex-row justify-between items-center">
                                        <div>
                                            {currentBreakdown?.breakdown_name}
                                        </div>
                                        <div>
                                            <Input
                                                className="inline w-fit mr-2"
                                                type="number"
                                                min={0}
                                                max={
                                                    currentBreakdownSpecs[
                                                        Number(x)
                                                    ]
                                                }
                                                step={1}
                                                size={2}
                                            />
                                            / {currentBreakdownSpecs[Number(x)]}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    <Dialog>
                        <DialogTrigger>
                            <div className="rounded-lg px-3 py-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground duration-100 [&_*]:duration-100">
                                Change preset
                            </div>
                        </DialogTrigger>
                        <DialogContent className="w-[90vw] text-center flex flex-col gap-2 items-center">
                            <p>Select preset</p>
                            <div className="flex flex-row flex-wrap justify-center gap-2">
                                {breakdownPresets.map((preset) => {
                                    return (
                                        <DialogClose>
                                            <div className="shadow-md w-fit p-2 rounded-sm cursor-pointer hover:shadow-xl">
                                                {Object.keys(
                                                    preset.breakdown_specs
                                                ).map((breakdownIdString) => {
                                                    if (
                                                        preset.breakdown_specs[
                                                            Number(
                                                                breakdownIdString
                                                            )
                                                        ] == 0
                                                    ) {
                                                        return ""
                                                    } else {
                                                        return (
                                                            <div className="flex flex-row justify-between w-60">
                                                                <div>
                                                                    {
                                                                        breakdownParams.find(
                                                                            (
                                                                                x
                                                                            ) =>
                                                                                x.breakdown_id ==
                                                                                Number(
                                                                                    breakdownIdString
                                                                                )
                                                                        )
                                                                            ?.breakdown_name
                                                                    }
                                                                </div>
                                                                <div>
                                                                    {
                                                                        preset
                                                                            .breakdown_specs[
                                                                            Number(
                                                                                breakdownIdString
                                                                            )
                                                                        ]
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </DialogClose>
                                    )
                                })}
                            </div>
                            <div className="mt-4 flex flex-row justify-around gap-2">
                                <DialogClose>
                                    <Button variant={"outline"}>Cancel</Button>
                                </DialogClose>
                                <DialogClose>
                                    <Button>Send</Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </>
        )
    }
}

export default page
