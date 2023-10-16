'use client'

import { useCoursesStore } from "@/store/courses"
import { useServiceStore } from "@/store/service"
import { useUserStore } from "@/store/user"

export default function Create() {
    const useService = useServiceStore()
    const useCourse = useCoursesStore() 
    const useUser = useUserStore()

    async function createCourse() {
        await useCourse.actions.createCourse(
            useService.state.courseProgram, 
            "WOOOO Novo curso - dev program solana", 
            "https://www.youtube.com/watch?v=hPPHdp0l9yw",
            useUser.state.user.key
        )
    }

    return (
        <button onClick={createCourse}>Criar</button>
    )
}