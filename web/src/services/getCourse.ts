import { getCourses } from "./getCourses"

interface ICourse {
    id: string
    name: string
    duration: string
    professor: string
    img: string
    price: string
  }

export const getCourse = async (id: string, program): Promise<ICourse | void> => {
    const course = (await getCourses(program)).find(course => course.id === id )
    console.log(course)
    return course
}