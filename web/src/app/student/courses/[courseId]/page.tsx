'use client'
import { useCoursesStore } from "@/store/courses"
import { useServiceStore } from "@/store/service"
import { useEffect, useState } from "react"
import { CourseDescriptionComponent, Main, WatchCourseComponent } from "./styles"
import { HeaderComponent } from "@/components/HeaderComponent"

export default function WatchCourse({ params }: any) {
    const { actions } = useCoursesStore()
    const { state } = useServiceStore()
    const [course, setCourse] = useState({})

    async function getViewCourse() {
        const course = await actions.getCourse(params.courseId, state.courseProgram)
        setCourse(course)
        console.log(course)
    }

    useEffect(() => {
        getViewCourse()
    }, [])
    

    return (
        <div style={{width: "100%"}}>
            <HeaderComponent title="Assistir" link="/" />
            <Main>
                <WatchCourseComponent>
                    <iframe src={course.courseContent} allowFullScreen className="uk-responsive-width min-w-full min-h-full"></iframe>
                    <CourseDescriptionComponent>
                    <h3 style={{margin: "0", padding: "0"}}>{course.name}</h3>
                        <p style={{margin: "0", padding: "0"}}>{course.courseView}</p>
                    </CourseDescriptionComponent>
                </WatchCourseComponent>
            </Main>
        </div>
    )
}