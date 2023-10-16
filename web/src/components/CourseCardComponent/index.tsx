import Link from "next/link"
import { Card, CardImg, MainCardSection } from "./styles"
import { useRouter, useSearchParams } from "next/navigation"
import { ConfirmBuyComponent } from "../ConfirmBuyComponent"
import { useEffect, useState } from "react"
import { useUserStore } from "@/store/user"

export const CourseCardComponent = ({
    name, 
    price,
    img,
    id,
    isClass = false
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isBuyed, setIsBuyed] = useState(false)
    const { state, actions } = useUserStore()
    const [isOwner, setIsOwner] = useState(() => actions.checkIfCourseBelongsToUser(id))
    const { push } = useRouter()
    
    function redirectPush() { 
        push(`/student/courses/${id}`) 
    } 

    function addCourse() {
        actions.addCourseToUser(id)
    }

    function buyCourse() {
        setIsLoading(true)
        setTimeout(() => { setIsLoading(false); setIsBuyed(true); addCourse() }, 500)

    }

    return (
        <Card>
                <CardImg src={img}/>
                <MainCardSection >
                        <div className="course_name">
                            <p>{name}</p>
                        </div>

                        {
                            !isOwner ?
                            <div className="teacher_and_price">
                            { isLoading && !isBuyed && <div className="loader" /> }
                            { !isLoading && isBuyed && <p>Comprado</p> }
                            { !isOwner && !isBuyed && !isLoading && <button onClick={buyCourse}>Comprar<p>{price}</p></button> }
                            </div>
                            : <div className="teacher_and_price">
                                { isClass &&  <button onClick={redirectPush}>Assistir</button> }
                                { !isClass && <p>Comprado</p> }
                            </div>
                        }
                </MainCardSection>
        </Card>
    )        
}