"use client"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Save, Share } from "lucide-react"

type Props={
        selectedTab:any        
}

function WorkspaceHeader({selectedTab}:Props) {

        return (
                <div className="p-3 border-b flex justify-between">
                        <div className="flex gap-2 items-center">
                                <Image
                                        src="/logo.svg"
                                        alt="logo image"
                                        width={35}
                                        height={35}
                                />
                                <h2>Workspace Name</h2>
                        </div>
                        {/* Switch */}
                        <div>
                                <Tabs defaultValue={selectedTab} onValueChange={(value)=>selectedTab(value)} >
                                        <TabsList>
                                                <TabsTrigger value="whiteboard">Whiteboard</TabsTrigger>
                                                <TabsTrigger value="docs">Docs</TabsTrigger>
                                        </TabsList>
                                </Tabs>
                        </div>

                        {/* Extra button */}
                        <div className="flex gap-2">
                                <Button><Save /> Save</Button>
                                <Button variant="outline"><Share /> Share</Button>
                        </div>

                </div>
        )
}

export default WorkspaceHeader