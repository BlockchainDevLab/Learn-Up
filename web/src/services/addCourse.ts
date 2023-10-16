interface ICourse {
    courseViewURI: string
    courseName: string
    courseContentURI: string
}

export const addCourse = async (course: ICourse) => {
    console.log(course)
}