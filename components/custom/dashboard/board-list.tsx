
"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import CreateBoardDialog from "../board/create-board-dialog"
import axios from "axios"
import moment from "moment"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Trash2 } from "lucide-react"
import {Button} from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

type Board = {
        id:string;
        boardId: string;
        boardName: string;
        previewImage: string;
        userEmail:string;
        createdAt:string;
        updatedAt:string;
}
function BoardList() {

        const router = useRouter()

        const [boardList,setBoardList] = useState<Board[]>([])
        const [isDeleteLoading, setIsDeleteLoading] = useState(false)

        const getBoardList = async () =>{
                try{
                         setBoardList([])
                        const result = await axios.get('api/board')

                        setBoardList(result.data)
                }catch(err){
                        console.log(`Error in getBoardList: ${err}`)
                }
        }
        useEffect(() => {
                getBoardList()
        },[])

        const handleDeleteBoard = async (boardId:string) => {
                try{
                         setIsDeleteLoading(false)
                        await axios.delete(`/api/board?boardId=${boardId}`)
                        toast.add({type:"success",title:"Board deleted successfully"})
                        getBoardList()
                }catch(err){
                        console.log(`Error in handleDeleteBoard: ${err}`)
                }finally{
                        setIsDeleteLoading(false)
                }
        
        }
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
                                        <div className="mt-10 p-10">

                                                <h2 className="font-bold text-2xl">Your Boards</h2>
                                                <p className="font-medium text-sm text-gray-600">Create, organizee and collaborate on boards</p>
                                                {/*flex flex-wrap  gap-4  mt-5 |  grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-2 mt-4 */}
                                                <div className="  grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-4 mt-4 ">
                                                         {
                                                        boardList.length>0 && boardList.map((board:Board)=>{
                                                                return <div 
                                                                key={board.id} 
                                                                className="border rounded-lg w-[240px]  p-2 cursor-pointer shadow-sm transition-all hover:transform hover:scale-105 hover:rotate-1"
                                                               
                                                                >
                                                                        <div
                                                                         onClick={()=>{
                                                                                router.push(`/workspace/${board.boardId}`)
                                                                        }}
                                                                        role="button"
                                                                        className="h-[280px] "
                                                                        >
                                                                                <Image 
                                                                                        src={board?.previewImage ?? "/folder.png"} 
                                                                                        alt={board?.boardName} 
                                                                                        height={200} 
                                                                                        width={100}
                                                                                        className="w-full rotate-1 p-4"
                                                                                />

                                                                                <div className="p-2">
                                                                                        <h2 className="font-medium text-sm ">{board?.boardName}</h2>        
                                                                                        <p className="mt-1 text-xs text-gray-400">{`Edited : `+ moment(board.updatedAt).fromNow() }</p>
                                                                                </div>

                                                                        </div>

                                                                        <Separator />

                                                                        <div className="flex justify-between p-2 gap-2 ">
                                                                                <span className="text-xs text-gray-400">whiteboard</span>
                                                                               <Button
                                                                                       variant="destructive"
                                                                                       onClick={()=>{
                                                                                                handleDeleteBoard(board.boardId)
                                                                                       }}
                                                                                       disabled={isDeleteLoading}
                                                                                       className="rounded-md cursor-pointer"
                                                                               >
                                                                                        {
                                                                                                isDeleteLoading ? "Deleting..." : <Trash2 size={16} />
                                                                                        }
                                                                               </Button>
                                                                        </div>
                                                                     
                                                                </div>
                                                        })
                                                }
                                                </div>
                                               
                                        </div>
                                )
                        }
                 </div>
        )
}

export default BoardList