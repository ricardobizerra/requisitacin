"use client"

import { cinComposedLogo } from "@/assets"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useRole } from "@/contexts"

interface User {
    createdAt: Date
    email: string
    id: string
    name: string
    role: "STUDENT" | "ADMIN"
    universitySectionId?: string
    updatedAt: Date
}

export const Header = ({ title }: { title: string }) => {
    const [usersList, setUsersList] = useState<User[]>([]);

    const { user: userLogged, setUser } = useRole()

    const fetchUser = async () => {
        const { data } = await api.get('/user');
        setUsersList(data.data);
    }

    const displayRole = (role: User['role']) => {
        switch (role) {
            case 'STUDENT':
                return {
                    text: 'Aluno',
                    color: 'bg-blue-500'
                };
            case 'ADMIN':
                return {
                    text: 'Servidor',
                    color: 'bg-green-500'
                };
            default:
                return {
                    text: 'Não definido',
                    color: 'bg-gray-500'
                };
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <header className='bg-red p-2 flex items-center justify-around'>
            <div className='flex gap-2'>
                <Image
                    src={cinComposedLogo}
                    alt='Logo do CIn'
                    height={32}
                />

                <h1 className='text-white font-medium text-2xl'>
                    {title}
                </h1>
            </div>

            <div className="bg-white rounded-sm">
                <Select
                    onValueChange={(value) => {
                        const currentUser = usersList.find((user) => user.email.split('-teste')[0] === value)!;
                        setUser(currentUser);
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue defaultValue="dark" />
                    </SelectTrigger>
                    <SelectContent>
                        {usersList.map((user) => (
                            <SelectItem key={user.id} value={user.email.split('-teste')[0]}>
                                {user.email.split('-teste')[0]}
                                {' '}
                                <span className={`${displayRole(user.role).color} text-xs text-white p-1 ml-1 rounded uppercase`}>{displayRole(user.role).text}</span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </header>
    )
}

export default Header