export const majorList = [
    { major_id: 0, majorName: "BSc. Software Engineering" },
    { major_id: 1, majorName: "BSc. Applied Computer Technology" },
    { major_id: 2, majorName: "BSc. Data Science" },
]

export const courseList = [
    { course_id: "APT2080", courseName: "Intro. to SWE" },
    { course_id: "APT2030", courseName: "Digital Electronics" },
    { course_id: "MTH2010", courseName: "Probability and Statistics" },
    { course_id: "APT1050", courseName: "Database Systems" },
    { course_id: "SWE1020", courseName: "Data Structures and Algorithms" },
]

export interface CourseType {
    course_id: string
    courseName: string
}

export const majorCourseList = [
    { major_id: 0, course_id: "APT2080" },
    { major_id: 1, course_id: "APT2080" },
    { major_id: 0, course_id: "APT2030" },
    { major_id: 1, course_id: "APT2030" },
    { major_id: 0, course_id: "MTH2010" },
    { major_id: 0, course_id: "APT1050" },
    { major_id: 1, course_id: "APT1050" },
    { major_id: 2, course_id: "APT1050" },
    { major_id: 0, course_id: "SWE1020" },
    { major_id: 1, course_id: "SWE1020" },
    { major_id: 2, course_id: "SWE1020" },
]

export const userData = {
    username: "johndoe21",
    major: 0,
    positive_progress: true,
}

export type PresetIdType = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface CurrentCoursesType {
    preset_id: PresetIdType, course_id: string, result_id: number
}

export const currentCoursesList: CurrentCoursesType[] = [
    { preset_id: 1, course_id: "APT2080", result_id: 0 },
    { preset_id: 0, course_id: "MTH2010", result_id: 1 },
    { preset_id: 0, course_id: "APT1050", result_id: 2 },
]

export interface BreakdownParamsType {
    breakdown_id: PresetIdType, breakdown_name: string
}

export const breakdownParams: BreakdownParamsType[] = [
    { breakdown_id: 0, breakdown_name: "Attendance & Participation" },
    { breakdown_id: 1, breakdown_name: "Assignments" },
    { breakdown_id: 2, breakdown_name: "CATs" },
    { breakdown_id: 3, breakdown_name: "Mid-Sem Exam" },
    { breakdown_id: 4, breakdown_name: "End-Sem Exam" },
    { breakdown_id: 5, breakdown_name: "Term Paper" },
    { breakdown_id: 6, breakdown_name: "Project" },
]

export const breakdownPresets = [
    {
        preset_id: 0,
        breakdown_specs: { 0: 10, 1: 20, 2: 20, 3: 20, 4: 30, 5: 0, 6: 0 },
    },
    {
        preset_id: 1,
        breakdown_specs: { 0: 10, 1: 0, 2: 20, 3: 20, 4: 30, 5: 0, 6: 20 },
    },
]

export const currentResults = [
    {
        result_id: 0,
        0: null,
        1: null,
        2: 18,
        3: 15,
        4: null,
        5: null,
        6: null,
    },
    {
        result_id: 1,
        0: null,
        1: 20,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
    },
    {
        result_id: 2,
        0: null,
        1: 19,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
    },
]

export type BreakdownSpecsType = {
    [breakdown_id in PresetIdType]: number
}

interface ResultListType {
    [breakdown_result_id: number]: number | null
}
export interface ResultsType extends ResultListType {
    result_id: number
}