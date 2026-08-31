import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
        Card,

} from "@/components/ui/card"
import { convertToExcalidrawElements } from "@excalidraw/excalidraw"
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types"
import { Dessert, Notebook, Smile } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
        excalidrawApi: ExcalidrawImperativeAPI | null,

}
function WorkspaceHelper({
        excalidrawApi
}: Props) {

        const [selectedTab, setSelectedTab] = useState('')

        return (
                <div className="absolute left-1/2 bottom-0 z-50 -translate-y-1/2 flex flex-col gap-2 rounded-xl bg-white border p-2 shadow-xl">
                        <div className="flex gap-3">
                                <Button variant={"outline"} onClick={() => setSelectedTab(prev => {
                                        if (prev === "stickynotes") return ""
                                        return "stickynotes"
                                })}>
                                        <Notebook /> Notes
                                </Button>
                                <Button variant={"outline"} onClick={() => setSelectedTab(prev => {
                                        if (prev === "emojis") return ""
                                        return "emojis"
                                })} >
                                        <Smile /> Emojis
                                </Button>
                        </div>

                        {
                                selectedTab === "stickynotes" ?
                                        <StickNotes excalidrawApi={excalidrawApi} /> :
                                        selectedTab === "emojis" ?
                                                <EmojisIcon excalidrawApi={excalidrawApi} /> : ""
                        }
                </div>
        )
}

const note_options = [
        {
                style: "sticky",
                heading: 'Sticky Note',
                subHeading: 'Warm idea card',
                backgroundColor: "#FFEDB9",
                badgeColor: "#FFCB56",
                barColor: "#FFA259",
                strokeColor: "#E8C45A",
                shadowColor: "#E7D9A7",
        },
        {
                style: "glass",
                heading: 'Glass Note',
                subHeading: 'Polished meeting note',
                backgroundColor: "#E3F2FD",
                badgeColor: "#90CAF9",
                barColor: "#2196F3",
                strokeColor: "#90CAF9",
                shadowColor: "#C9DFF0",
        },
        {
                style: "task",
                heading: 'Task Note',
                subHeading: 'Structured checklist title',
                backgroundColor: "#E8F5E9",
                badgeColor: "#A5D6A7",
                barColor: "#66BB6A",
                strokeColor: "#81C784",
                shadowColor: "#C9DFC9",
        }
]

function StickNotes({
        excalidrawApi
}: Props) {


        const getEmptyCanvasPosition = () => {
                if (!excalidrawApi) return { x: 100, y: 100 }

                const elements = excalidrawApi.getSceneElements().filter(ele => !ele.isDeleted)

                if (elements.length == 0) return { x: 100, y: 100 }

                // add to right side
                // find the right most element
                const maxRight = Math.max(...elements.map(ele => ele.x + ele.width))
                const minTop = Math.min(...elements.map(ele => ele.y + ele.height))

                return {
                        x: maxRight + 150,
                        y: minTop
                }
        }
        const handleAddEmptyNote = (noteStyle: string) => {
                if (!excalidrawApi || !noteStyle) return
                const position = getEmptyCanvasPosition()

                const note = note_options.find(
                        (option) => option.style === noteStyle
                )

                if (!note) return

                const x = position.x;
                const y = position.y;

                const width = 420;
                const height = 250;

                /*
                 * The note is made from several rectangles:
                 *
                 * 1. Shadow
                 * 2. Main card
                 * 3. Small badge
                 * 4. Accent bar
                 */

                const noteElements = convertToExcalidrawElements([
                        // --------------------------------
                        // DROP SHADOW
                        // --------------------------------
                        {
                                type: "rectangle",

                                // Slightly offset from the card
                                x: x + 10,
                                y: y + 14,

                                width,
                                height,

                                backgroundColor: note.shadowColor,
                                strokeColor: note.shadowColor,

                                fillStyle: "solid",
                                strokeWidth: 0,
                                roughness: 0,

                                roundness: {
                                        type: 3,
                                },

                                opacity: noteStyle === "glass" ? 45 : 55,
                        },

                        // --------------------------------
                        // MAIN NOTE
                        // --------------------------------
                        {
                                type: "rectangle",

                                x,
                                y,

                                width,
                                height,

                                backgroundColor: note.backgroundColor,
                                strokeColor: note.strokeColor,

                                fillStyle: "solid",
                                strokeWidth: noteStyle === "glass" ? 1.5 : 2,

                                roughness: 0,

                                roundness: {
                                        type: 3,
                                },

                                // Glass should feel a little lighter
                                opacity: noteStyle === "glass" ? 75 : 100,
                        },

                        // --------------------------------
                        // TOP-LEFT BADGE
                        // --------------------------------
                        {
                                type: "rectangle",

                                x: x + 20,
                                y: y + 20,

                                width: 120,
                                height: 32,

                                backgroundColor: note.badgeColor,
                                strokeColor: note.badgeColor,

                                fillStyle: "solid",
                                strokeWidth: 0,

                                roughness: 0,

                                roundness: {
                                        type: 3,
                                },

                                opacity: noteStyle === "glass" ? 65 : 100,
                        },

                        // --------------------------------
                        // ACCENT BAR
                        // --------------------------------
                        {
                                type: "rectangle",

                                x: x + 20,
                                y: y + 68,

                                width: 100,
                                height: 12,

                                backgroundColor: note.barColor,
                                strokeColor: note.barColor,

                                fillStyle: "solid",
                                strokeWidth: 0,

                                roughness: 0,

                                roundness: {
                                        type: 3,
                                },

                                opacity: noteStyle === "glass" ? 75 : 100,
                        },
                ]);

                const currentElements = excalidrawApi.getSceneElements()

                excalidrawApi.updateScene({
                        elements: [
                                ...currentElements,
                                ...noteElements
                        ]
                })

        }
        return <div
                className="
                                absolute right-1/25 bottom-15 z-[1000]
                                w-[380px]
                                overflow-hidden
                                rounded-xl
                                border border-gray-200
                                bg-white
                                shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                                p-4
                        "
        >
                <div className="flex flex-col gap-2 p-2">
                        <h2 className="font-bold text-md">Add Note</h2>
                        <p className="font-semibold text-sm text-gray-400">Pick a blank sticky note style</p>

                        <div className="flex flex-col gap-4">
                                {
                                        note_options.map((note) => {
                                                return <Card
                                                        className="w-full  flex flex-row items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => {
                                                                handleAddEmptyNote(note.style)
                                                        }}
                                                >

                                                        <div className="w-[100px] h-[100px] p-4 rounded-2xl rotate-2 flex flex-col gap-4" style={{ backgroundColor: note.backgroundColor }} >
                                                                <Badge style={{ backgroundColor: note.badgeColor }}>New</Badge>
                                                                <div className="w-[50px] h-[10px] rounded-2xl" style={{ backgroundColor: note.barColor }}></div>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                                <h4 className='font-bold'>{note.heading}</h4>
                                                                <p className="text-gray-500">{note.subHeading}</p>
                                                        </div>
                                                </Card>
                                        })
                                }

                        </div>
                </div>
        </div>
}
function EmojisIcon({
        excalidrawApi
}: Props) {


        const getEmptyCanvasPosition = () => {
                if (!excalidrawApi) return { x: 100, y: 100 }

                const elements = excalidrawApi.getSceneElements().filter(ele => !ele.isDeleted)

                if (elements.length == 0) return { x: 100, y: 100 }

                // add to right side
                // find the right most element
                const maxRight = Math.max(...elements.map(ele => ele.x + ele.width))
                const minTop = Math.min(...elements.map(ele => ele.y + ele.height))

                return {
                        x: maxRight + 150,
                        y: minTop
                }
        }

         const handleAddEmptyNote = (iconEmoji:any) => {
                   const position = getEmptyCanvasPosition()

                   // logic to insert emoji or icon
         }


        return <div className="
                                absolute right-1/25 bottom-15 z-[1000]
                                w-[380px]
                                overflow-hidden
                                rounded-xl
                                border border-gray-200
                                bg-white
                                shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                                p-4
                        ">
                <div className="flex flex-col gap-2 p-2">
                        <h2 className="font-bold text-md">Add Emoji</h2>
                        <p className="font-semibold text-sm text-gray-400">Pick a emoji to insert </p>
                </div>

                <div className="w-full  mt-4">
                        <Tabs defaultValue="emojis" className="w-full">
                                <TabsList className="w-full">
                                        <TabsTrigger value="emojis">
                                                <Smile />
                                                Emojis
                                        </TabsTrigger>
                                        <TabsTrigger value="icon">
                                                <Dessert />
                                                Icon
                                        </TabsTrigger>
                                </TabsList>

                                <TabsContent value="emojis" className="w-full ">
                                        <Card className="p-10">
                                                <p className=" font-semibold text-gray-500 text-sm">Soon this feature will be available</p>
                                        </Card>
                                </TabsContent>
                                <TabsContent value="icon" className="w-full">
                                        <Card className="p-10">
                                                <p className=" font-semibold text-gray-500 text-sm">Soon this feature will be available</p>
                                        </Card>
                                </TabsContent>
                        </Tabs>


                </div>


        </div>
}

export default WorkspaceHelper