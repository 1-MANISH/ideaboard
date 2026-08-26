"use client"
import Docs from "@/components/custom/workspace/docs"
import Whiteboard from "@/components/custom/workspace/whiteboard"
import WorkspaceHeader from "@/components/custom/workspace/workspace-header"
import { useState } from "react"

function WorkspaceBoard() {

        const [activeTab,setActiveTab] =useState('whiteboard')

        return (
                 <div>
                        <WorkspaceHeader selectedTab={(value:string)=>setActiveTab(value)}/>

                       <div>
                                {
                                        activeTab==="whiteboard" ? <Whiteboard/> : <Docs />
                                }
                        </div>         
                 </div>
        )
}

export default WorkspaceBoard