"use client"
import { useUserStore } from '@/store/user'
import { services } from '../../services'

export default function Page() {
    const { state } = useUserStore()

    console.log(state)
    return (
        <h1>
           Saldo: {state.user.balance ?? ""}
        </h1>
    )
}