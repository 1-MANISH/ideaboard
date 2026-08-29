"use client"
import { toast } from "@/components/ui/toast";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css"
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import "./whiteboard.css"
import { ArrowRight, Circle, Diamond, Eraser, Hand, Image, Minus, MousePointer2, Pencil, Sparkle, Square, Type, WandSparkles } from "lucide-react";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import FloatingBar from "./floating-bar";
import { Button } from "@/components/ui/button";
import AIFloatingSidebar from "./ai-floating-sidebar";


const tools = [
        {
                name: "selection",
                icon: MousePointer2,
                color: "text-blue-600"
        },
        {
                name: "hand",
                icon: Hand,
                color: "text-cyan-600"
        },
        {
                name: "rectangle",
                icon: Square,
                color: "text-purple-600"
        },
        {
                name: "diamond",
                icon: Diamond,
                color: "text-cyan-600"
        },
        {
                name: "ellipse",
                icon: Circle,
                color: "text-yellow-600"
        },
        {
                name: "arrow",
                icon: ArrowRight,
                color: "text-violet-600"
        },
        {
                name: "line",
                icon: Minus,
                color: "text-pink-600"
        },
        {
                name: "freedraw",
                icon: Pencil,
                color: "text-orange-600"
        },
        {
                name: "text",
                icon: Type,
                color: "text-indigo-600"
        },
        {
                name: "eraser",
                icon: Eraser,
                color: "text-white-600"
        },
        {
                name: "image",
                icon: Image,
                color: "text-green-600"
        },
        {
                name: "laser",
                icon: WandSparkles,
                color: "text-pink-600"
        },
]

function Whiteboard() {

        const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)
        const [activeTool, setActiveTool] = useState('selection')
        const [selectedElement,setSelectedElement] =useState<any>(null)
        const [canvasState,setCanvasState]=useState<any>(null)
        const [showAiSideBar,setShowAiSideBar] = useState(true)


        const { boardId } = useParams()
        const saveTimeRef = useRef<any>(null)

        const saveCanvasChanges = async (elements: readonly any[], appState: any, files: any) => {
                try {
                        const response = await axios.post('/api/whiteboard', {
                                elements: elements,
                                appState: appState,
                                files: files,
                                boardId: boardId
                        })

                } catch (error) {
                        console.log(`Error in saving board`)
                }
        }

        const handleCanvasChange = (elements: readonly any[], appState: any, files: any) => {
                // console.log(elements,appState,files)
                try {
                        setCanvasState(appState)

                        // find selected element
                        const selectedIds = Object.keys(appState.selectedElementIds)||{}

                        if(selectedIds.length===1){
                                const element = elements.find((element)=>element.id===selectedIds[0])
                                setSelectedElement(element)
                        }else{
                                setSelectedElement(null)
                        }

                        // Cancel prev timer
                        if (saveTimeRef.current) {
                                clearTimeout(saveTimeRef.current)
                        }

                        // // Start new 10 seconds timer
                        // saveTimeRef.current = setTimeout(async()=>{
                        //         // save method
                        //         await saveCanvasChanges(elements,appState,files)
                        //         toast.add({
                        //                 type:"success",
                        //                 title:"Board saved",
                        //                 description:"Your board successfully saved!"
                        //         })
                        // },10*1000)


                } catch (error) {
                        console.log(`Error in change of board`)
                }
        }

        const changeTool = (tool: any) => {
                if (!excalidrawAPI) return

                setActiveTool(tool)

                excalidrawAPI.setActiveTool({
                        type: tool
                })
        }

        const getFloatingPosition = useCallback(() =>{
                if(!selectedElement || !canvasState)return {left:0, top:0}

                const zoom = canvasState.zoom?.value ?? 1
                const scrollX = canvasState.scrollX ?? 0
                const scrollY = canvasState.scrollY ?? 0

                // center of selected element
                const centerX = selectedElement.x + selectedElement.width / 2

                // convert exaclidraw cordinates to screen coordinates
                const screenX = (centerX+scrollX)*zoom
                const screenY = (selectedElement.y+scrollY)*zoom

                return{
                        left:screenX,
                        top:screenY-60
                }
              
        },[selectedElement,canvasState])

        const floatingPosition = useMemo(getFloatingPosition, [selectedElement,canvasState])

        const handlePropertyChange = (property:string,value:any)=>{
                if(!excalidrawAPI || !selectedElement)return

                const element = excalidrawAPI.getSceneElements()
             

                const updatedElements = element?.map((element:any)=>{
                        if(element.id!=selectedElement.id)return element
                        else {
                               return   {
                                        ...element,
                                        [property]:value,
                                        version:element.version+1,
                                        updated:Date.now()
                                }
                        }
                })

                excalidrawAPI.updateScene(
                      {  elements:updatedElements}
                )
        }

        const handleDeleteElement = (elementId:string)=>{
                if(!excalidrawAPI)return

                const element = excalidrawAPI.getSceneElements()

                const updatedElements = element?.map(element=>{
                        if(element.id===selectedElement.id){
                                return {
                                        ...element,
                                        isDeleted:true,
                                        version:element.version+1,
                                        updated:Date.now()
                                }
                        }else return element
                })
                excalidrawAPI.updateScene(
                      {  elements:updatedElements}
                )
                setSelectedElement(null)
        }

        const handleLockElement = (elementId:string)=>{
                if(!excalidrawAPI)return

                const element = excalidrawAPI.getSceneElements()

                const updatedElements = element?.map(element=>{
                        if(element.id===selectedElement.id){
                                return {
                                        ...element,
                                        locked:true,
                                        version:element.version+1,
                                        updated:Date.now()
                                }
                        }else return element
                })
                excalidrawAPI.updateScene(
                      {  elements:updatedElements}
                )
        }

        const handleCopyElement = ()=>{
                if(!excalidrawAPI)return

                const elements = excalidrawAPI.getSceneElements()

                const updatedElements = [...elements,{
                                 ...selectedElement,
                                id:crypto.randomUUID(),
                                version:1,
                                x:selectedElement.x+15,
                                y:selectedElement.y+15,
                                seed:Math.floor(Math.random()*1000),
                                updated:Date.now(),
                                isDeleted:false
                }]

                excalidrawAPI.updateScene(
                      {  elements:updatedElements}
                )
        }

        const handleBringFrontOrBack = (side:string) =>{
                if(!excalidrawAPI)return

                const elements = excalidrawAPI.getSceneElements()

                const selected  = elements.find(ele=>ele.id===selectedElement.id)

                if(!selected)return

                const remainingElements = elements.filter(ele=>ele.id!==selectedElement.id)

               if(side==='back'){
                        excalidrawAPI.updateScene({
                               elements:[
                                selected,
                                ...remainingElements
                               ] 
                        })
                }else{
                         excalidrawAPI.updateScene({
                               elements:[
                                 ...remainingElements,
                                selected
                               ] 
                        })
                }
   
        }

        return (
                <div style={{ height: "95vh" }}>

                        <Excalidraw
                                //@ts-ignore
                                excalidrawAPI={(api) => setExcalidrawAPI(api)}
                                onChange={handleCanvasChange}

                        />

                        <div className="absolute left-4 top-1/2 z-50 -translate-y-1/2 flex flex-col gap-2 rounded-2xl bg-white border p-2 shadow-xl">
                                {
                                        tools.map((tool) => {
                                                const Icon = tool.icon
                                                return (
                                                        <button
                                                                key={tool.name}
                                                                className={
                                                                        `flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-primary/10 hover:cursor-pointer ${activeTool == tool.name ? 'bg-primary/10' : ''}`
                                                                }
                                                                onClick={() => changeTool(tool.name)}
                                                        >
                                                                <Icon size={24} className={`${tool.color}`} />
                                                        </button>
                                                )
                                        })
                                }
                        </div>

                        {
                                selectedElement && 
                                <FloatingBar 
                                        selectedElement={selectedElement} 
                                        position={floatingPosition} 
                                        onPropertyChange={(property,value)=>handlePropertyChange(property,value)}
                                        onDelete={(elementId:string)=>handleDeleteElement(elementId)}
                                        onDuplicate={()=>handleCopyElement()}
                                        onLock={(elementId:string)=>handleLockElement(elementId)}
                                        onBringToFront={()=>handleBringFrontOrBack('front')}
                                        onSendToBack={()=>handleBringFrontOrBack('back')}
                                />
                        }

                        <div
                                className="absolute right-15 bottom-5 z-1000"
                        >
                                <Button size={"lg"} onClick={()=>setShowAiSideBar(prev=>!prev)}>
                                        <Sparkle /> AI
                                </Button>
                        </div>
                       {showAiSideBar &&  <AIFloatingSidebar
                                excalidrawApi={excalidrawAPI}
                       />}
                </div>
        )
}

export default Whiteboard