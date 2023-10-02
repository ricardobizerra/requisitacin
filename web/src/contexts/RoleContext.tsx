"use client"

import { api } from "@/lib/axios";
import { createContext, use, useContext, useState } from "react";

export type Role = "STUDENT" | "ADMIN";

export interface User {
    email: string
    id: string
    name: string
    role: Role

    Student?: {
        id: string,
        userId: string
        createdAt: Date
        updatedAt: Date

        Requisition?: {
            id: string
            title: string
            body: string
            status: string
            studentId: string
            serviceId: string
            universitySectionId: string

            service?: {
                id: string
                name: string
                universitySectionId: string
                createdAt: Date
                updatedAt: Date
            }
        }[]
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

export interface Section {
    id: string
    name: string
    slug: string

    createdAt: Date
    updatedAt: Date

    services: {
        id: string
        name: string

        createdAt: Date
        updatedAt: Date

        universitySectionId: string
    }[]
}

export interface RoleContextData {
    user: User | null
    setUser: (user: User) => void
    usersList: User[]
    fetchUser: () => Promise<void>
    sectionsList: Section[]
    fetchSection: () => Promise<void>

    searchStudent: (id: string) => User | undefined
    searchService: (id: string) => {
        id: string;
        title?: string;
        body?: string;
        status?: string;
        studentId?: string;
        serviceId?: string;
        universitySectionId: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
    } | undefined
}

const RoleContext = createContext({} as RoleContextData);

export const useRole = () => { return useContext(RoleContext) };

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [usersList, setUsersList] = useState<User[]>([]);
    const [sectionsList, setSectionsList] = useState<Section[]>([]);

    const fetchUser = async () => {
        const { data } = await api.get('/user');
        setUsersList(data.data);
    }

    const fetchSection = async () => {
        const { data } = await api.get('/section');
        setSectionsList(data.data);
    }

    const searchStudent = (id: string) => {
        return usersList.find((user) => user.Student?.id === id);
    }

    const searchService = (id: string) => {
        if (user?.UniversitySection !== null) return user?.UniversitySection?.services?.find((service) => service.id === id);
        console.log(user?.Student?.Requisition?.find((requisition) => requisition.id === id)?.service)
        return user?.Student?.Requisition?.find((requisition) => requisition.id === id)?.service;
    }

    return (
        <RoleContext.Provider value={{ 
            user,
            setUser,

            usersList,
            fetchUser,

            sectionsList,
            fetchSection,

            searchStudent,
            searchService,
        }}>
            {children}
        </RoleContext.Provider>
    )
}