"use client"
import { Progress } from "@/components/ui/progress"
import {
        Sidebar,
        SidebarContent,
        SidebarFooter,
        SidebarGroup,
        SidebarGroupLabel,
        SidebarHeader,
        SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"
import {  ArchiveIcon, LayoutGrid, SettingsIcon, Sparkles, UserRound } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import CreateBoardDialog from "../board/create-board-dialog"
import Link from "next/link"
import { useContext } from "react"
import { UserDetailContext } from "@/context/userDetailContext"

export function AppSidebar() {

        const totalCredits = 3
        const path = usePathname()

        const {user} = useUser()

        const {userDetail,setUserDetail} = useContext(UserDetailContext)

        console.log(userDetail)
        return (
                <Sidebar>

                        <SidebarHeader className="p-4">
                               <div className="flex items-center gap-2">
                                        <Image src="/logo.svg" alt="ideaboard logo" width={40} height={40} />
                                        <h2 className="text-xl font-bold">IDEABOARD</h2>
                               </div>
                        </SidebarHeader>

                        <SidebarContent>

                                <SidebarGroup >
                                        <CreateBoardDialog />
                                </SidebarGroup>

                                 <SidebarGroup >
                                       <SidebarGroupLabel>My boards</SidebarGroupLabel>

                                       <SidebarMenuButton className="p-4 mt-3" isActive={path === "/dashboard"}>
                                                <Link href="/dashboard" className="flex  items-center gap-2">
                                                        <LayoutGrid />
                                                <span>All Files</span>
                                                </Link>
                                       </SidebarMenuButton>
                                       <SidebarMenuButton className="p-4 mt-3" isActive={path === "/shared"}>
                                                <Link href="/shared"  className="flex  items-center gap-2">
                                                        <UserRound />
                                                        <span>Shared</span>
                                                </Link>
                                               
                                       </SidebarMenuButton>
                                       <SidebarMenuButton className="p-4 mt-3" isActive={path === "/archieved"}>
                                                 <Link href="/archieved"className="flex  items-center gap-2" >
                                                <ArchiveIcon />
                                                <span>Archived</span>
                                                </Link>
                                       </SidebarMenuButton>

                                </SidebarGroup>

                                <SidebarGroup>
                                          <SidebarGroupLabel>Others</SidebarGroupLabel>

                                            <SidebarMenuButton className="p-4 mt-3" isActive={path === "/ai"}>
                                                <Sparkles />
                                                <span>AI Helper</span>
                                       </SidebarMenuButton>
                                       <SidebarMenuButton className="p-4 mt-3" isActive={path === "/settings"}>
                                                <SettingsIcon />
                                                <span>Settings</span>
                                       </SidebarMenuButton>
                                </SidebarGroup>

                        </SidebarContent>

                        <SidebarFooter >
                                

                                  <div className="p-4 my-3 border rounded-md">
                                        <h2 className="text-sm flex justify-between">{totalCredits-userDetail?.credits} files created <span>total {totalCredits}</span></h2>
                                        <Progress value={((totalCredits-userDetail?.credits)/totalCredits) * 100} className="h-2 mt-2"/>
                                  </div>

                                  <div className="flex items-center gap-2 p-4 border rounded-md">
                                        <Image
                                                src={user?.imageUrl ?? ''}
                                                alt="User image"
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                        />
                                        <h2>{user?.firstName} {user?.lastName}</h2>
                                  </div>
                        </SidebarFooter>
                </Sidebar>
        )
}