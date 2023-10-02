"use client"

import { useRole } from "@/contexts";
import { StudentTable } from "..";
import Link from "next/link";
import { Button } from "../ui/button";

export default function StudentMenu() {
    const { user } = useRole()
    return (
        <>
            <p>Olá, {user?.name.split(' ')[0]}! Confira suas solicitações aqui!</p>

            <Link className="mt-4" href="/requisition">
                <Button className="pl-4 pr-4 pt-0 pb-0 uppercase font-medium leading-relaxed">+ Nova Solicitação</Button>
            </Link>

            <StudentTable />
        </>
    )
}