import { methods } from '../wallet'

export async function POST(request: Request) {
    const { addUser, getUser } = methods

    const user = await request.json()

    addUser(user)

    return new Response(JSON.stringify(user))
}

export async function GET() {
    const {getUser} = methods

    const user = getUser()

    return new Response(user)
}