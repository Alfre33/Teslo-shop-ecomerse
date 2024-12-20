import { auth } from "@/auth.config"
import { Tittle } from "@/components"
import { redirect } from "next/navigation"

export default async function Profilepage() {
const session= await auth()

if (!session){
    redirect('/auth/login')
}

  return (
    <div className="flex flex-col justify-center items-center">
        <Tittle tittle="Perfil de usuario"/>
        <pre className="text-xl my-10">{JSON.stringify(session.user,null ,2)}</pre>
        <h2>{session.user.role}</h2>
    </div>
  )
}
