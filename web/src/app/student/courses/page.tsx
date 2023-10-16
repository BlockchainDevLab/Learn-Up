"use client"
import { CourseCardComponent } from "@/components/CourseCardComponent"
import { Card } from "@/components/CourseCardComponent/styles"
import { HeaderComponent } from "@/components/HeaderComponent"
import { useCoursesStore } from "@/store/courses"
import { useServiceStore } from "@/store/service"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CoursesComponent } from "./styles"
import { useUserStore } from "@/store/user"

export default function Courses() {
    const useCourses = useCoursesStore()
    const useService = useServiceStore()
    const useUser = useUserStore()
    const [courses, setCourses] = useState([])

    async function getCourses() {
        const program = useService.state.courseProgram

        const courses = await useUser.actions.getUserCourses(program) 

        setCourses(courses)
    }

    useEffect(() => {
        getCourses()
    }, [])

    return (
        <div style={{height: "100vh"}}>
            <HeaderComponent title="Meus cursos" link="/" />
            <CoursesComponent>
                {
                    courses?.map(({
                        courseAmount, 
                        name,
                        id
                    }) => (
                        <CourseCardComponent 
                            key={id}
                            img='/learn&up.jpg'
                            name={name}
                            price={"25,83R$"}
                            id={id}
                            isClass={true}
                        />
                    ))
                }
            </CoursesComponent>
        </div>
    ) 
} 