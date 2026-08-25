"use client"
import React, { useEffect } from 'react'
import axios from "axios"
import {UserDetailContext} from "@/context/userDetailContext"

function Provider({children}:{children:React.ReactNode}) {

        const[userDetail, setUserDetail] = React.useState({})

        useEffect(()=>{
                CreateNewUser()
        },[])
        const CreateNewUser = async () =>{
                try{
                        const result = await axios.post('/api/users')
                        setUserDetail(result.data)
                }catch(error){
                        console.log(`Error in signup: ${error}`)
                }
        }
        return (
                <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
                        <div>
                                {children}
                        </div>
                </UserDetailContext.Provider>
        )
}

export default Provider