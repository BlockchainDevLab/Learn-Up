import { create } from 'zustand'
import { getCourses } from '@/services/getCourses'
import { addCourse } from '@/services/addCourse'
import { getCourse } from '@/services/getCourse'
import { createCourse } from '@/services/createCourse'


interface ICourse {
    courseViewURI: string
    courseName: string
    courseContentURI: string
}

  export const useCoursesStore = create((set) => ({
    state: {
        courses: async () => await getCourses()
    },
    actions : {
        addCourse: (course: ICourse) => {
            addCourse(course)
        },

        getCourse: async (id: string, program) => {
            return await getCourse(id, program)
        }, 

        getCourses: async (program) => {
            return await getCourses(program)
        },

        createCourse: async (program, name, uri, publicKey) => {
            return await createCourse(program, name, uri, publicKey)
        }
    } 
}))