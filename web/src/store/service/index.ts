import { InitialSetup } from '@/services/InitialSetup'
import { create } from 'zustand'

export const useServiceStore = create((set) => ({
    state: {
        connection: {},
        provider: {},
        courseProgram: {}
    },
    actions: {
        setup: async (connection, solanaWallet) => {
            const program = await InitialSetup(connection, solanaWallet)

            set(state => ({ state: { courseProgram: program } }))

        },
    }
}))