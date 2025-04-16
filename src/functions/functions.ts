export const validCoursesNumber = (num: number) => {
    return Number.isInteger(num) && num >= 0 && num <= 250
}

export const validGPA = (num: number) => {
    return num >= 0.1 && num <= 4
}

export interface AuthKey {
    token: string | null
}

export interface MeType {
    id: number
    user: {
        email: string
    }
    student_number: string
    cumulative_gpa: string
    total_credit_hours: number
    major: number
}

export interface MajorType {
    id: number
    name: string
}

export interface CourseType {
    id: number
    course_code: string
    course_name: string
}

export interface EnrollmentType {
    id: number
    student: number
    course: number
}

export interface ProjectionType {
    id: number
    student: number
    semester: string
    desired_semester_gpa: string
    projected_cumulative_gpa: string
    is_on_track: boolean
}
