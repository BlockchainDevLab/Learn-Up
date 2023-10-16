"use client"
import { useServiceStore } from '@/store/service';
import { services } from '../../services'
import { useUserStore } from "@/store/user";
import Link from 'next/link'

export default function Page() {
  const userStore = useUserStore()
  const serviceStore = useServiceStore()

  async function connect() {
    const { user, connection, solanaWallet } = await services.connectWallet()

    userStore.actions.addUser(user)
    serviceStore.actions.setup(connection, solanaWallet)
  }

  return (
    <>
      <strong className='mr-5'>Conectar a Carteira</strong>
      <button onClick={connect}>Conectar</button><br />
      <Link href="/balance"><button>Ver Saldo</button></Link><br />
      <Link href="/courses"><button>Cursos</button></Link>
      <Link href="/courses/create"><button>Criar</button></Link>
    </>
  )
}