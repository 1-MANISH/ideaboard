"use client"
import Docs from "@/components/custom/workspace/docs"
import Whiteboard from "@/components/custom/workspace/whiteboard"
import WorkspaceHeader from "@/components/custom/workspace/workspace-header"
import { exportToBlob } from "@excalidraw/excalidraw"
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types"
import { useState } from "react"

function WorkspaceBoard() {

        const [activeTab,setActiveTab] =useState('whiteboard')
        const[api,setApi] = useState<ExcalidrawImperativeAPI | null>(null)

        const handleExportImage = async () =>{


                if(!api)return

                const blob = await exportToBlob({
                        elements: api.getSceneElements(),
                        appState:{
                                ... api.getAppState(),
                                exportBackground: true
                        },
                        files:api.getFiles(),
                        mimeType:'image/png',
                        quality:1
                })

              

                const url = URL.createObjectURL(blob)

                const link = document.createElement('a')
                link.href = url
                link.download = 'whiteboard.png'
                link.click()

                URL.revokeObjectURL(url)
        }

        return (
                 <div>
                        <WorkspaceHeader 
                                selectedTab={(value:string)=>setActiveTab(value)}
                                onExport={handleExportImage}
                        />

                       <div>
                                {
                                        activeTab==="whiteboard" ? 
                                        <Whiteboard
                                                onApiReady={(api:ExcalidrawImperativeAPI) =>setApi(api)}
                                        /> : 
                                        <Docs />
                                }
                        </div>         
                 </div>
        )
}

export default WorkspaceBoard