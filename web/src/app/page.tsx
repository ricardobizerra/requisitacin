"use client"

import { AdminMenu, StudentMenu } from "@/components";
import { useRole } from "@/contexts"

export default function Home() {
  const { user } = useRole()

  if (!user) return <Main>Por favor, selecione qual das contas você irá utilizar na barra acima.</Main>

  else if (user.role === 'ADMIN') return <Main><AdminMenu /></Main>

  else return <Main><StudentMenu /></Main>
}

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center p-4">
      {children}
    </main>
  )
}
