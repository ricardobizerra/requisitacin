"use client"

import { useRole } from "@/contexts";
import { UniversityTable } from "..";

export default function AdminMenu() {
    const { user } = useRole()
    return (
        <>
            <p>Olá, {user?.name.split(' ')[0]}!</p>
            <br />

            <h2 className="text-lg">Requisições para a <strong className="font-semibold">{user?.UniversitySection?.name}</strong></h2>
            <UniversityTable />
        </>
    )
}