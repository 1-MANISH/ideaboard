
"use client"
import { useState } from "react"
import Image from "next/image"
import CreateBoardDialog from "../board/create-board-dialog"
function BoardList() {

        const [boardList,setBoardList] = useState([])


        return (
                 <div>
                        {
                                boardList?.length===0 ? (
                                        <div className="flex flex-col items-center  p-10   border rounded-lg mt-10">

                                                <Image src="/folder.png" alt=" Folder Image"  height={60} width={60}/>
                                                <h2 className="text-sm my-2 font-bold">No Boards Found</h2>
                                                  <div><CreateBoardDialog /></div>
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