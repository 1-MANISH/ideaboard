"use client"
import { Button } from "@/components/ui/button"
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
import {  ArchiveIcon, LayoutGrid, PlusIcon, SettingsIcon, Sparkles, UserRound } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function AppSidebar() {


        const path = usePathname()

        const {user} = useUser()
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
                                        <Button> <PlusIcon /> Create New Board</Button>
                                </SidebarGroup>

                                 <SidebarGroup >
                                       <SidebarGroupLabel>My boards</SidebarGroupLabel>

                                       <SidebarMenuButton className="p-4 mt-3" isActive={path === "/dashboard"}>
                                                <LayoutGrid />
                                                <span>All Files</span>
                                       </SidebarMenuButton>
                                       <SidebarMenuButton className="p-4 mt-3" isActive={path === "/shared"}>
                                                <UserRound />
                                                <span>Shared</span>
                                       </SidebarMenuButton>
                                       <SidebarMenuButton className="p-4 mt-3" isActive={path === "/archived"}>
                                                <ArchiveIcon />
                                                <span>Archived</span>
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
                                  <Button><PlusIcon />  Create New Board</Button>

                                  <div className="p-4 my-3 border rounded-md">
                                        <h2 className="text-sm flex justify-between">2 files created <span>total 3</span></h2>
                                        <Progress value={66} className="h-2 mt-2"/>
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