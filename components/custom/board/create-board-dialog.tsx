"use client"
import {
        Dialog,
        DialogContent,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
        DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { Loader2, PlusIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

function CreateBoardDialog() {

        const [workspaceName,setWorkspaceName] = useState("")
        const [loading,setLoading] =useState(false)
        const [dialog,setDialog] =useState(true)
        const router = useRouter()

        const handleCreateBoard = async () =>{
                try {
                        setLoading(true)
                        if(workspaceName.trim()==="" || workspaceName.length>30){
                               toast.add({
                                        type:"error",
                                        title:"Invalid workspace name",
                                        description:"Please add a valid workspace name"
                               })
                               return
                        }
                        const boardId =  crypto.randomUUID()
                        const response = await axios.post('/api/board',{
                                boardId:boardId,
                                boardName:workspaceName
                        })

                        toast.add({
                                type:"success",
                                title:"New Workspace created",
                                description:"Your new workspace successfully created!"
                        })

                          setWorkspaceName("")
                          setDialog(false)
                          router.push(`/workspace/${response.data.boardId}`)


                } catch (error) {
                        console.log(`Error in creating workspace`,error)
                        toast.add({
                               type:"error",
                                title:"Something went wrong, Try again",
                                description:"Something went wrong on server side , please retry"
                        })
                }finally{
                        setLoading(false)
                }
        }

        return (
                <Dialog open={dialog} onOpenChange={setDialog}>
                        {/* Button to trigger dialog */}
                        <DialogTrigger >
                                <Button className="w-full"> <PlusIcon /> Create New Board</Button>
                        </DialogTrigger>

                        <DialogContent >
                                <DialogHeader>
                                        <DialogTitle className="text-lg font-bold">Create A New Workspace</DialogTitle>
                                </DialogHeader>
                                <div>
                                        <label className="text-gray-700">Enter White board Name</label>
                                        <Input 
                                                onChange={(e)=>setWorkspaceName(e.target.value)}
                                                value={workspaceName}
                                                placeholder="Workspace name" 
                                                className="mt-2"
                                        />
                                </div>
                                  <DialogFooter>
                                       <DialogClose> <Button variant={"outline"}>Cancel</Button></DialogClose>
                                        <Button 
                                                onClick={handleCreateBoard}
                                                
                                                disabled={workspaceName?.length==0 || workspaceName?.length>30 || loading}
                                        >
                                                {
                                                        loading ? (
                                                                <> <Loader2  className="animate-spin"/> Creating...</>
                                                        ) :'Create'
                                                }
                                        </Button>
                                </DialogFooter>
                        </DialogContent>
                      
                </Dialog>
        )
}

export default CreateBoardDialog