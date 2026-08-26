import { db, whiteboardData } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

        const {boardId,elements,appState,files}= await req.json()

        const user = currentUser()

        if(!user){
                return NextResponse.json({error:"Unauthorized user"},{status:404})
        }

       try{
                if(boardId){
                        const response = await db.insert(whiteboardData).values({
                                boardId:boardId,
                                elements:elements,
                                appState:appState,
                                files:files
                        }).onConflictDoUpdate({
                                target:whiteboardData.boardId,
                                set:{
                                        elements:elements,
                                        appState:appState,
                                        files:files,
                                        updatedAt:new Date()
                                },
                        })

                        return NextResponse.json(response)
                }

       }catch(error){
                return   NextResponse.json({error:"Internal server error"},{status:500})
       }
        return   NextResponse.json({error:"Something went wrong"},{status:500})
       
}