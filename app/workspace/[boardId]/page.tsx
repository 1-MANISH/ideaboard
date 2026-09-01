"use client"
import Docs from "@/components/custom/workspace/docs"
import Whiteboard from "@/components/custom/workspace/whiteboard"
import WorkspaceHeader from "@/components/custom/workspace/workspace-header"
import { exportToBlob } from "@excalidraw/excalidraw"
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types"

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

function WorkspaceBoard() {

        const[boardName,setBoardName]=useState("");
        const [activeTab,setActiveTab] =useState('whiteboard')
        const[api,setApi] = useState<ExcalidrawImperativeAPI | null>(null)
        const {boardId} = useParams()

        useEffect(()=>{
                boardId && api && getWhiteBoardData()
        },[boardId,api])
        const getWhiteBoardData = async() =>{
                try{
                        const result = await axios.get('/api/board?boardId='+boardId)
                        
                        if(!result.data)throw new Error('No data found')
                        if(result.data.boardName)
                                setBoardName(result.data.boardName)
                        api?.updateScene({
                                elements:result.data.elements || [],
                                // appState: result.data.appState || {},
                                // appState:normalizeAppState(result.data.appState)
                               
                        })

                        if(result.data.files){
                                api?.addFiles(
                                        Object.values(result.data.files)
                                )
                        }
                }catch(err){
                        console.log('Error in getting whiteboard data',err)
                }
        }

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
                                selectedTab={(value:string)=>setActiveTab && setActiveTab(value)}
                                onExport={handleExportImage}
                                boardName={boardName}
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