import { boards, db, users, whiteboardData } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
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

        // user credit > 0 
   
        const userCredits =  await db.select().from(users)
                .where(eq(users.email,user?.primaryEmailAddress?.emailAddress))

        
        if(Number( userCredits[0].credits ?? 0) <=0){
                return NextResponse.json({
                        error:"You have no credits left"
                })
        }        

        const result = await db.insert(boards).values({
                boardId:boardId,
                boardName:boardName??'',
                userEmail:user?.primaryEmailAddress?.emailAddress??''
        }).returning()

        await db.update(users).set({
                credits:Number(userCredits[0].credits)-1
        }).where(eq(users.email,user?.primaryEmailAddress?.emailAddress))


        return NextResponse.json(result[0])
}

export async function GET(req:NextRequest){

        const searchParams = req.nextUrl.searchParams
        const boardId = searchParams.get('boardId')
        const archived = searchParams.get("archived")

      

        const user = await currentUser()


        if(!boardId && user){
                // means fetch all boards

                const isDeleted = archived ? true :false

                const boardLists = await db.select({
                        id:boards.id,
                        boardId:boards.boardId,
                        boardName:boards.boardName,
                        userEmail:boards.userEmail,
                        createdAt:boards.createdAt,
                        previewImage:whiteboardData.previewImage,
                        updatedAt:whiteboardData.updatedAt
                })
                .from(boards)
                .leftJoin(whiteboardData,eq(boards.boardId,whiteboardData.boardId))
                .where(and(eq(boards.userEmail,user?.primaryEmailAddress?.emailAddress??''),eq(boards.isDeleted,isDeleted)))

                return NextResponse.json(boardLists)

        }

        if(! boardId!){
                return NextResponse.json({error:'Please provide board id'})
        }

        // @ts-ignore
        const userBoard = await db.select().from(boards).where(and(eq(boards.boardId,boardId),eq(boards.userEmail,user?.primaryEmailAddress?.emailAddress??'')))


        if(userBoard.length===0){
                return NextResponse.json({error:'Unauthorized user'})
        }

        const result = await db.select().from(whiteboardData).where(eq(whiteboardData.boardId,boardId))

        return NextResponse.json({
                ...result[0],
                boardName:userBoard[0].boardName
        })

}

export async function DELETE(req:NextRequest){

        const searchParams = req.nextUrl.searchParams
        const boardId = searchParams.get('boardId')
        const archived = searchParams.get("archived")

        if(!boardId){
                return NextResponse.json({error:'Please provide board id'})
        }

        if(archived){

                const whiteboardDataResult = await db.delete(whiteboardData).where(eq(whiteboardData.boardId,boardId))
                const result = await db.delete(boards).where(
                        eq(boards.boardId,boardId)
                )

                return NextResponse.json({
                        message:'Board deleted successfully'
                })
        }else{
                 const result = await db.update(boards).set({
                        isDeleted:true
                }).where(eq(boards.boardId,boardId))


                return NextResponse.json({
                        message:'Board moved to archived successfully'
                })
        }

       
}

export async function PUT(req:NextRequest){

        const searchParams = req.nextUrl.searchParams
        const boardId = searchParams.get('boardId')


        const user = await currentUser()

        if(!user){
                return NextResponse.json({
                        error:"User not found"
                })
        }
        if(! boardId!){
                return NextResponse.json({error:'Please provide board id'})
        }

        // @ts-ignore
        const userBoard = await db.select().from(boards).where(and(eq(boards.boardId,boardId),eq(boards.userEmail,user?.primaryEmailAddress?.emailAddress??'')))
        if(userBoard.length===0){
                return NextResponse.json({error:'Unauthorized user'})
        }

        const result = await db.update(boards).set({
                isDeleted:false
        }).where(eq(boards.boardId,boardId)).returning()

        return NextResponse.json({
                message:'Board restored successfully',
                board:result[0]
        })
}
