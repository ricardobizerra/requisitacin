"use client"

import { cinComposedLogo } from "@/assets"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useRole } from "@/contexts"
import { User } from "@/contexts/RoleContext"

export const Header = ({ title }: { title: string }) => {

    const { 
        user: userLogged, 
        setUser,
        usersList,
        fetchUser
    } = useRole()

    const displayRole = (user: User) => {
        switch (user.role) {
            case 'STUDENT':
                return {
                    text: 'Aluno',
                    color: 'bg-blue-500'
                };
            case 'ADMIN':
                return {
                    text: user.UniversitySection?.slug,
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
                        <SelectValue placeholder="Selecione uma conta" />
                    </SelectTrigger>
                    <SelectContent>
                        {usersList.map((user) => (
                            <SelectItem key={user.id} value={user.email.split('-teste')[0]}>
                                {user.email.split('-teste')[0]}
                                {' '}
                                <span className={`${displayRole(user).color} text-xs text-white p-1 ml-1 rounded uppercase`}>{displayRole(user).text}</span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </header>
    )
}

export default Header