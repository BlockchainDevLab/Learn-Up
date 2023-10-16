"use client"
import { useServiceStore } from '@/store/service';
import { services } from '../services'
import { useUserStore } from "@/store/user";
import { HeaderComponent } from '@/components/HeaderComponent';
import { MainComponent } from './styles';
import { useRouter } from 'next/navigation';
import { ConfirmBuyComponent } from '@/components/ConfirmBuyComponent';

export default function Page() {
  const { push } = useRouter()
  const userStore = useUserStore()
  const serviceStore = useServiceStore()  

  async function connect() {    
  const { user, connection, solanaWallet } = await services.connectWallet()

  await userStore.actions.addUser(user)
  await serviceStore.actions.setup(connection, solanaWallet)
  
  push("/courses")
} 
      
    return (
      <MainComponent>
        <HeaderComponent title="LEARN&UP"/>
        <button onClick={connect}>Conectar</button><br />
      </MainComponent>
    )
}