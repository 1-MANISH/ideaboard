"use client"
import { toast } from "@/components/ui/toast";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css"
import axios from "axios";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import "./whiteboard.css"
import {   ArrowRight, Circle, Diamond, Eraser, Hand, Image, Minus, MousePointer2, Pencil, PencilIcon, Square, Type, TypeOutline, WandSparkles, } from "lucide-react";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";


const tools=[
        {
                name:"selection",
                icon:MousePointer2,
                color:"text-blue-600"
        },
         {
                name:"hand",
                icon:Hand,
                color:"text-cyan-600"
        },
        {
                name:"rectangle",
                icon:Square,
                color:"text-purple-600"
        },
        {
                name:"diamond",
                icon:Diamond,
                color:"text-cyan-600"
        },
        {
                name:"ellipse",
                icon:Circle,
                color:"text-yellow-600"
        },
        {
                name:"arrow",
                icon:ArrowRight,
                color:"text-violet-600"
        },
        {
                name:"line",
                icon:Minus,
                color:"text-pink-600"
        },
         {
                name:"freedraw",
                icon:Pencil,
                color:"text-orange-600"
        },
        {
                name:"text",
                icon:Type,
                color:"text-indigo-600"
        },
        {
                name:"eraser",
                icon:Eraser,
                color:"text-white-600"
        },
        {
                name:"image",
                icon:Image,
                color:"text-green-600"
        },
        {
                name:"laser",
                icon:WandSparkles,
                color:"text-pink-600"
        },
]

function Whiteboard() {

         const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI|null>(null);
         const [activeTool,setActiveTool] = useState('selection')
         const {boardId} = useParams()

         const saveTimeRef = useRef<any>(null)

         const saveCanvasChanges = async(elements:readonly any[],appState:any,files:any)  =>{
                try{
                        const response = await axios.post('/api/whiteboard',{
                                elements:elements,
                                appState:appState,
                                files:files,
                                boardId:boardId
                        })

                }catch(error){
                        console.log(`Error in saving board`)
                }       
         }

        const handleCanvasChange = (elements:readonly any[],appState:any,files:any) => {

                try{
                        // Cancel prev timer
                        if(saveTimeRef.current){
                                clearTimeout(saveTimeRef.current)
                        }

                        // Start new 10 seconds timer
                        saveTimeRef.current = setTimeout(async()=>{
                                // save method
                                await saveCanvasChanges(elements,appState,files)
                                toast.add({
                                        type:"success",
                                        title:"Board saved",
                                        description:"Your board successfully saved!"
                                })
                        },10*1000)
                }catch(error){
                                 console.log(`Error in change of board`)
                }
        }

        const changeTool = (tool:any)=>{
                if(!excalidrawAPI)return

                setActiveTool(tool)

                excalidrawAPI.setActiveTool({
                        type:tool
                })
        }

        return (
                 <div style={{height:"95vh"}}>

                        <Excalidraw 
                                //@ts-ignore
                                excalidrawAPI={(api)=> setExcalidrawAPI(api)}
                                onChange={handleCanvasChange}
                                
                        />

                        <div className="absolute left-4 top-1/2 z-50 -translate-y-1/2 flex flex-col gap-2 rounded-2xl bg-white border p-2 shadow-xl">
                                {
                                        tools.map((tool)=>{
                                                const Icon = tool.icon
                                                return (
                                                        <button 
                                                                className={
                                                                        `flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-primary/10 hover:cursor-pointer ${activeTool==tool.name ?'bg-primary/10':''}`
                                                                }
                                                                onClick={()=>changeTool(tool.name)}
                                                        >
                                                                <Icon size={24} className={`${tool.color}`}/>
                                                        </button>
                                        )
                                        })
                                }
                        </div>
                 </div>
        )
}

export default Whiteboard