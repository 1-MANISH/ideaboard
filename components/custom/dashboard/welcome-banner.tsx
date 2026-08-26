"use client"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { Sparkles } from "lucide-react"
import CreateBoardDialog from "../board/create-board-dialog"

function WelcomeBanner() {

        const {user} = useUser()
        return (
                <div>
                        <div className="p-10  border rounded-lg bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 ">   
                                <span className="flex mb-4 gap-2 text-blue-500 font-bold"><Sparkles /> Creative workspace</span>
                                <h2 className="text-2xl font-bold">Welcome Back ,<span className="text-blue-600"> {user?.fullName}</span></h2>
                                <p className="mt-2 text-sm text-gray-800">Thinking of a new board? Don't worry, we have a white board for you.</p>

                                <div className="mt-5 flex gap-2">
                                          <CreateBoardDialog />
                                        <Button variant="outline"> <Sparkles /> Ai Helper</Button>
                                </div>
                        </div>
                </div>
        )
}

export default WelcomeBanner