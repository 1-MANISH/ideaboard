import { db, users } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// sign-up
export async function POST(request:NextRequest){

        const user = await currentUser()

        // data from provider
        if(user){
                //@ts-ignore
                const userData = await db.select().from(users).where(eq(user.primaryEmailAddress?.emailAddress, users.email))
                // if user already exists?
                if(userData?.length >0){
                        return NextResponse.json(userData[0])
                }else{// create new user
                        const result = await db.insert(users).values({
                                name:user?.fullName,
                                email:user?.primaryEmailAddress?.emailAddress??'',
                        }).returning()

                        return NextResponse.json(result[0])
                }
        }

        // if user not exists
        return NextResponse.json({message:"User not found"},{status:404})
}