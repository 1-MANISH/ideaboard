"use client"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/toast';
import axios from 'axios';
import { Backpack, Trash2 } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from 'react'

type Board = {
        id:string;
        boardId: string;
        boardName: string;
        previewImage: string;
        userEmail:string;
        createdAt:string;
        updatedAt:string;
}
function ArchivedBoardList() {


         const router = useRouter()

        const [archivedBoardList,setArchivedBoardList] = useState<Board[]>([])
        const [isDeleteLoading, setIsDeleteLoading] = useState(false)
        const [isRestoringLoading, setIsRestoringLoading] = useState(false)

        const getBoardList = async () =>{
                try{
                         setArchivedBoardList([])
                        const result = await axios.get('api/board?archived=true')

                        setArchivedBoardList(result.data)
                }catch(err){
                        console.log(`Error in getBoardList: ${err}`)
                }
        }

        const handleRestoreBoard = async (boardId:string) => {
                try{
                         setIsRestoringLoading(true)
                        await axios.put(`/api/board?boardId=${boardId}`,{})
                        toast.add({type:"success",title:"Board restored successfully"})
                        getBoardList()
                }catch(err){
                        toast.add({type:"error",title:"Error in restoring board"})
                        console.log(`Error in handleRestoreBoard: ${err}`)
                }finally{
                        setIsRestoringLoading(false)
                }
        }
          const handleDeleteBoard = async (boardId:string) => {
                try{
                         setIsDeleteLoading(true)
                        await axios.delete(`/api/board?boardId=${boardId}&archived=true`)
                        toast.add({type:"success",title:"Board deleted successfully"})
                        getBoardList()
                }catch(err){
                        toast.add({type:"error",title:"Error in deleting board"})
                        console.log(`Error in handleDeleteBoard: ${err}`)
                }finally{
                        setIsDeleteLoading(false)
                }
        }

        useEffect(() => {
                getBoardList()
        },[])
        return (
       <div>
                        {
                                archivedBoardList?.length===0 ? (
                                        <div className="flex flex-col items-center  p-10   border rounded-lg mt-10">

                                                <Image src="/folder.png" alt=" Folder Image"  height={60} width={60}/>
                                                <h2 className="text-sm my-2 font-bold">No Archived Boards Found</h2>
                                                <p  className="text-sm my-2 text-gray-600">Boards you move to archive will appear  here with restore and permanent delete options</p>
                                         </div>
                                ):(
                                        <div className="mt-10 p-10">

                                                <h2 className="font-bold text-2xl">Your Archived Boards</h2>
                                                <p className="font-medium text-sm text-gray-600">Create, organizee and collaborate on boards</p>
                                                {/*flex flex-wrap  gap-4  mt-5 |  grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-2 mt-4 */}
                                                <div className="  grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-4 mt-4 ">
                                                         {
                                                        archivedBoardList.length>0 && archivedBoardList.map((board:Board)=>{
                                                                return <div 
                                                                key={board.id} 
                                                                className="border rounded-lg w-[240px]  p-2 cursor-pointer shadow-sm transition-all hover:transform hover:scale-105 hover:rotate-1"
                                                               
                                                                >
                                                                        <div
                                                                        //  onClick={()=>{
                                                                        //         router.push(`/workspace/${board.boardId}`)
                                                                        // }}
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
                                                                                       
                                                                                <Button
                                                                                        variant="ghost"
                                                                                        onClick={()=>{
                                                                                                        handleRestoreBoard(board.boardId)
                                                                                        }}
                                                                                        disabled={isRestoringLoading}
                                                                                        className="rounded-md cursor-pointer"
                                                                                >
                                                                                                {
                                                                                                        isRestoringLoading ? "Restoring..." : <Backpack size={16} />
                                                                                                }
                                                                                </Button>
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

export default ArchivedBoardList