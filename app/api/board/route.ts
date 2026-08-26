import { boards, db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

        const {boardName,boardId} = await req.json()
        const user = await currentUser();

        if(!boardId || !boardName){
                return NextResponse.json({
                        error:"Please board information"
                })
        }

        if(!user){
                return NextResponse.json({
                        error:"User not found"
                })
        }

        const result = await db.insert(boards).values({
                boardId:boardId,
                boardName:boardName??'',
                userEmail:user?.primaryEmailAddress?.emailAddress??''
        }).returning()


        return NextResponse.json(result[0])
}