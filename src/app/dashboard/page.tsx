import React from "react"

const page = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <div className="mx-2 grid grid-cols-2 md:grid-cols-3 gap-6 [&>*]:border-2 [&>*]:rounded-md [&>*]:p-4">
                <div>
                    <div className="my-2 flex flex-row justify-between w-full">
                        <p>Cummulative GPA:</p>
                        <p className="text-2xl font-bold mt-1">2.8</p>
                    </div>
                    <div className="my-2 flex flex-row justify-between w-full">
                        <p>Projected GPA:</p>
                        <p className="text-2xl font-bold mt-1">3.2</p>
                    </div>
                </div>
                <div>
                    <p>Completed courses:</p>
                    <p className="w-fit mt-6 ml-auto text-3xl font-bold">21</p>
                </div>
            </div>
        </div>
    )
}

export default page
