"use client"

import { createContext, use, useContext, useState } from "react";

export type Role = "STUDENT" | "ADMIN";

export interface User {
    createdAt: Date
    email: string
    id: string
    name: string
    role: Role
    universitySectionId?: string
    updatedAt: Date
}

export interface RoleContextData {
    user: User | null
    setUser: (user: User) => void
}

const RoleContext = createContext({} as RoleContextData);

export const useRole = () => { return useContext(RoleContext) };

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <RoleContext.Provider value={{ user, setUser }}>
            {children}
        </RoleContext.Provider>
    )
}