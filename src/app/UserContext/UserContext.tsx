'use client'

import { createContext, useEffect, useState } from "react";
import { getUserProfile } from "../(main)/userActions/userActions";
import { UserProfile } from "../types/userProfile";


export const UserContext = createContext<UserProfile | null>(null)

export function UserContextProvider({children} : {children : React.ReactNode}){


    const [info , setInfo] = useState<UserProfile | null>(null)


   async function userData(){
        const data  = await getUserProfile()

        setInfo(data)


    }

    useEffect(()=>{
        userData()
    },[])
    return  <UserContext.Provider value={info}>
        {children}
    </UserContext.Provider>

   
}
