
"use client"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
function BoardList() {

        const [boardList,setBoardList] = useState([])


        return (
                 <div>
                        {
                                boardList?.length===0 ? (
                                        <div className="flex flex-col items-center  p-10   border rounded-lg mt-10">

                                                <Image src="/folder.png" alt=" Folder Image"  height={60} width={60}/>
                                                <h2 className="text-sm my-2 font-bold">No Boards Found</h2>
                                                <Button> <PlusIcon /> Create New Board</Button>
                                         </div>
                                ):(
                                        <div>
                                                {/* Board list */}
                                                <h1>Board List</h1>
                                        </div>
                                )
                        }
                 </div>
        )
}

export default BoardList