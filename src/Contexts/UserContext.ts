'use client'
import { createContext } from "react";
import IUser from "@/src/lib/module/user/user.types";

const UserContext = createContext<IUser | null>(null);

export default UserContext;
