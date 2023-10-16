import { services } from '@/services'
import { getCourses } from '@/services/getCourses'
import { create } from 'zustand'

export const useUserStore = create((set, get) => ({
    state: {
        user: {},
        courses: []
    },
    actions : {
        addUser: (user) => {
            set((state) => ({ state: { ...state.state, user } }))
        },
        addCourseToUser: (courseId) => {
            set(state => { 
                return { state: {...state.state, courses: [...state.state.courses, courseId] }}
            })
        },
        getUserCourses: async (program) => {
            const courses = await getCourses(program)
            return courses.filter(course => {
                return get().state.courses.some(userCourseId => userCourseId === course.id)
            })
        },
        
        checkIfCourseBelongsToUser: (courseId) => {
            return get().state.courses.some(id => courseId === id)
        },

        logoutUser: async () => {
            await services.logoutUser()
        }
    }
})) 