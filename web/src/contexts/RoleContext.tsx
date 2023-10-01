"use client"

import { api } from "@/lib/axios";
import { createContext, use, useContext, useState } from "react";

export type Role = "STUDENT" | "ADMIN";

export interface User {
    email: string
    id: string
    name: string
    role: "STUDENT" | "ADMIN"

    Student?: {
        id: string,
        userId: string
        createdAt: Date
        updatedAt: Date
    }

    universitySectionId?: string
    UniversitySection?: {
        id: string
        name: string
        slug: string
        createdAt: Date
        updatedAt: Date

        services?: {
            id: string
            name: string
            universitySectionId: string
            createdAt: Date
            updatedAt: Date
        }[]
    }

    createdAt: Date
    updatedAt: Date
}

export interface RoleContextData {
    user: User | null
    setUser: (user: User) => void
    usersList: User[]
    fetchUser: () => Promise<void>

    searchStudent: (id: string) => User | undefined
    searchService: (id: string) => {
        id: string;
        name: string;
        universitySectionId: string;
        createdAt: Date;
        updatedAt: Date;
    } | undefined
}

const RoleContext = createContext({} as RoleContextData);

export const useRole = () => { return useContext(RoleContext) };

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [usersList, setUsersList] = useState<User[]>([]);

    const fetchUser = async () => {
        const { data } = await api.get('/user');
        setUsersList(data.data);
    }

    const searchStudent = (id: string) => {
        return usersList.find((user) => user.Student?.id === id);
    }

    const searchService = (id: string) => {
        return user?.UniversitySection?.services?.find((service) => service.id === id);
    }

    return (
        <RoleContext.Provider value={{ 
            user,
            setUser,

            usersList,
            fetchUser,

            searchStudent,
            searchService,
        }}>
            {children}
        </RoleContext.Provider>
    )
}