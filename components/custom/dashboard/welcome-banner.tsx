"use client"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { PlusIcon, Sparkles } from "lucide-react"

function WelcomeBanner() {

        const {user} = useUser()
        return (
                <div>
                        <div className="p-10  border rounded-lg bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 ">   
                                <h2 className="text-2xl font-bold">Welcome Back , {user?.fullName}</h2>
                                <p className="mt-2 text-sm">Thinking of a new board? Don't worry, we have a white board for you.</p>

                                <div className="mt-5 flex gap-2">
                                        <Button> <PlusIcon /> Create New Board</Button>
                                        <Button variant="outline"> <Sparkles /> Ai Helper</Button>
                                </div>
                        </div>
                </div>
        )
}

export default WelcomeBanner