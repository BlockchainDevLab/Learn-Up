import { useUserStore } from "@/store/user"
import { Header, Title } from "./styles"
import Link from 'next/link'
import { useRouter } from "next/navigation"

export const HeaderComponent = ({ title, link }: { title: string, link?: string }) => {
    const { push } = useRouter()
    const { state, actions } = useUserStore()

    
    async function logoutUser() {
        await actions.logoutUser()
        push('/')
    }

    return (
        <Header link={link}>
            <Title>{title}</Title>
            <div className="right">
                { link && !state.user.info && <Link href={link ?? ""}><button>Conectar Carteira</button></Link> } 
                { link && title.toLowerCase() === "meus cursos" && <Link href="/courses"><button>Comprar cursos</button></Link> }
                { link && state.courses.length > 0 && title.toLowerCase() !== "meus cursos" && <Link href="/student/courses"><button>Meus cursos</button></Link> }
                { link && state.user.info && <button onClick={logoutUser} className="desconect">Desconectar</button> } 
            </div>
        </Header>
    )
}