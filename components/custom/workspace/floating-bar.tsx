import { Separator } from "@/components/ui/separator"
import {
        ArrowRight,
        Check,
        Circle,
        Copy,
        Diamond,
        Droplet,
        EllipsisVertical,
        Grid,
        Lock,
        Minus,
        Palette,
        Pencil,
        Square,
        Trash,
        Type,
        AlignCenter,
        AlignLeft,
        AlignRight,
        ArrowDownToLine,
        ArrowUpToLine,

} from "lucide-react"
import React, { useRef, useState } from "react"

import {
        HoverCard,
        HoverCardContent,
        HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectTrigger,
        SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
type Props = {
        selectedElement: any,
        position: {
                left: number,
                top: number
        },

        onDelete?: (elementId: string) => void,
        onDuplicate?: () => void,
        onLock?: (elementId: string) => void,

        onBringToFront?: () => void,
        onSendToBack?: () => void,

        onPropertyChange?: (property: string, value: any) => void
}

const COLORS = [
        "#1e1e1e",
        "#e03131",
        "#f08c00",
        "#2f9e55",
        "#1971c2",
        "#7048e8",
        "#ffffff"

]

const TEXT_ALIGN_OPTIONS = [
        {
                name: "left",
                icon: AlignLeft,
        },
        {
                name: "center",
                icon: AlignCenter,
        },
        {
                name: "right",
                icon: AlignRight
        }
]

const FONT_SIZE_OPTIONS = [
        {
                label: "16px",
                value: 16
        },
        {
                label: "20px",
                value: 20
        },
        {
                label: "28px",
                value: 28
        },
        {
                label: "36px",
                value: 36
        },
]

const BRING_OPTIONS = [
        {
                icon: ArrowUpToLine,
                name: 'Bring front'
        },
        {
                icon: ArrowDownToLine,
                name: 'Send back'
        }
]
function FloatingBar({
        selectedElement,
        position,

        onDelete,
        onDuplicate,
        onLock,

        onBringToFront,
        onSendToBack,

        onPropertyChange
}: Props) {

        if (!selectedElement) {
                return null
        }

        const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
        const dragElementRef = useRef(null)

        const type = selectedElement.type

        const isText = type === "text"
        const isShape = ["rectangle", "ellipse", "diamond"].includes(type)
        const isLine = type === "line"
        const isArrow = type === "arrow"
        const isFreeDraw = type === "freedraw"


        return (
                <div
                        className="absolute z-[100] flex -translate-x-1/2 items-center gap-1 p-4 shadow-lg rounded-lg bg-white-100"
                        style={{
                                left: position.left,
                                top: position.top
                        }}
                       
                >

                        <Grid className="mr-2" />

                        <Separator orientation="vertical" />
                        <div className="flex h-9 items-center  gap-2 px-2 text-sm font-medium">
                                {type === "rectangle" && <Square size={17} />}
                                {type === "ellipse" && <Circle size={17} />}
                                {type === "diamond" && <Diamond size={17} />}
                                {isText && <Type size={17} />}
                                {isLine && <Minus size={17} />}
                                {isArrow && <ArrowRight size={17} />}
                                {isFreeDraw && <Pencil size={17} />}
                        </div>

                        <Separator orientation="vertical" />

                        {/* COMMON PROPERTY */}

                        <HoverCard>
                                <HoverCardTrigger delay={10} closeDelay={100} render={<button className="flex h-9 w-9 items-center justify-center rounded-lg  hover:bg-gray-100"> <Palette size={17} /></button>} />
                                <HoverCardContent dir="bottom" className="mt-6 z-[200]  bg-white">
                                        <div className="font-semibold text-sm"> Stroke color</div>
                                        <div className="flex gap-2 items-center mt-2">
                                                {
                                                        COLORS.map((color) => {
                                                                return <ColorSquare
                                                                        color={color}
                                                                        key={color}
                                                                        active={selectedElement.strokeColor === color}
                                                                        onClick={() => onPropertyChange?.("strokeColor", color)}
                                                                />
                                                        })
                                                }
                                        </div>
                                </HoverCardContent>
                        </HoverCard>

                        {/* TEXT */}
                        {
                                isText &&
                                <>
                                        <Separator orientation="vertical" />

                                        <HoverCard>
                                                <HoverCardTrigger delay={10} closeDelay={100} render={<button className="flex h-9 w-9 items-center justify-center rounded-lg  hover:bg-gray-100"> <AlignLeft size={17} /></button>} />
                                                <HoverCardContent dir="bottom" className="mt-6 z-[200]  bg-white">
                                                        <div className="font-semibold text-sm"> Text alignment</div>
                                                        <div className="flex gap-2 items-center mt-2">
                                                                {
                                                                        TEXT_ALIGN_OPTIONS.map((align: any) => {
                                                                                return <TextStyleButton
                                                                                        key={align.name}
                                                                                        selected={selectedElement.textAlign === align.name}
                                                                                        onClick={() => onPropertyChange && onPropertyChange("textAlign", align.name)}
                                                                                        icon={<align.icon />}
                                                                                />
                                                                        })
                                                                }
                                                        </div>
                                                </HoverCardContent>
                                        </HoverCard>

                                </>
                        }

                        {/* SHAPE */}
                        {
                                isShape &&
                                <>
                                        <Separator orientation="vertical" />

                                        <HoverCard>
                                                <HoverCardTrigger delay={10} closeDelay={100} render={<button className="h-9 rounded-lg px-3 text-sm hover:bg-gray-100"><Droplet size={17} /></button>} />
                                                <HoverCardContent dir="bottom" className="mt-6 z-[200]  bg-white">
                                                        <div className="font-semibold text-sm"> Fill color</div>

                                                        <div className="flex gap-2 items-center mt-2">
                                                                {
                                                                        COLORS.map((color) => {
                                                                                return <ColorSquare
                                                                                        color={color}
                                                                                        key={color}
                                                                                        active={selectedElement.backgroundColor === color}
                                                                                        onClick={() => onPropertyChange && onPropertyChange?.("backgroundColor", color)}
                                                                                />
                                                                        })
                                                                }

                                                        </div>
                                                </HoverCardContent>
                                        </HoverCard>
                                </>
                        }

                        <Separator orientation="vertical" />
                        <button
                                className="h-9 rounded-lg px-3 text-sm hover:bg-gray-200"
                                onClick={() => onDuplicate && onDuplicate()}
                        >
                                <Copy size={17} />
                        </button>
                        <button
                                className="h-9 rounded-lg px-3 text-sm hover:bg-gray-200"
                                onClick={() => onLock && onLock(selectedElement.id)}
                        >
                                <Lock size={17} />
                        </button>
                        <button
                                className="h-9 rounded-lg px-3 text-sm text-red-400 hover:bg-gray-200"
                                onClick={() => onDelete && onDelete(selectedElement.id)}
                        >
                                <Trash size={17} />
                        </button>

                        <Separator orientation="vertical" />

                        <MenuBar
                                selectedElement={selectedElement}
                                type={type}
                                onPropertyChange={onPropertyChange}
                                onBringToFront={onBringToFront}
                                onSendToBack={onSendToBack}
                        />

                </div>
        )
}

function ColorSquare({
        color,
        active,
        onClick
}: { color: string, active?: boolean, onClick: () => void }) {

        return <button

                onClick={onClick}
                className={`
                        relative
                        flex
                        h-7
                        w-7

                        items-center
                        justify-center
                        rounded-full
                        border
                        transition
                        hover:scale-110

                `}

                style={{
                        backgroundColor: color
                }}
        >
                {
                        active && (
                                <Check size={12} className="text-white" />
                        )
                }
        </button>
}

function StrokeStyleButton({
        styleType,
        selected,
        onClick
}: {
        styleType: "solid" | "dashed" | "dotted",
        selected?: boolean,
        onClick: any
}) {

        return <button
                type="button"
                onClick={onClick}
                className={
                        `
                        flex
                        h-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        transition
                        p-2

                        ${selected ? "border-blue-300 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}
                        `
                }

        >
                <div
                        className={`
                                w-8 border-t-2 border-slate-600 
                                ${styleType === "solid" ? "border-solid" : styleType === "dashed" ? "border-dashed" : "border-dotted"}
                        `}
                />

        </button>

}

function PropertyLabel({ children }: { children: React.ReactNode }) {
        return <span className="text-[12px] font-bold text-slate-500">
                {children}
        </span>
}

function TextStyleButton({
        selected,
        onClick,
        icon
}: {
        selected?: boolean,
        onClick: () => void,
        icon: any
}) {

        return <button
                type="button"
                onClick={onClick}
                className={
                        `
                        flex
                        h-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        transition
                        p-2

                        ${selected ? "border-blue-300 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}
                        `
                }
        >

                <span > {icon}</span>
        </button>

}



function MenuBar({
        selectedElement,
        type,
        onPropertyChange,
        onBringToFront,
        onSendToBack,
}: {

        selectedElement: any
        type: any,
        onPropertyChange?: (property: string, value: any) => void,
        onBringToFront: any,
        onSendToBack: any,
}) {

        return <HoverCard>
                <HoverCardTrigger delay={10} closeDelay={100} render={<button className="h-9 rounded-lg px-3 text-sm hover:bg-gray-100"><EllipsisVertical size={17} /></button>} />

                <HoverCardContent dir="bottom" className="mt-6 z-[200]  bg-white flex flex-col gap-4">
                        <PropertyLabel >{type.charAt(0).toUpperCase() + type.slice(1)} options</PropertyLabel>



                        <div className="flex gap-2  mt-2 justify-between">

                                <button

                                        onClick={() => onBringToFront()}
                                        className={`
                                                                                                flex
                                                                                                text-xs
                                                                                                items-center
                                                                                                justify-center
                                                                                                rounded-lg
                                                                                                border
                                                                                                transition
                                                                                                p-2
                                                                                                hover:bg-slate-50"
                                                                                                gap-2
                                                                                        `}
                                >
                                        <ArrowUpToLine size={10} /> Bring front
                                </button>
                                <button

                                        onClick={() => onSendToBack()}
                                        className={`      text-xs
                                                                                                flex
                                                                                                items-center
                                                                                                justify-center
                                                                                                rounded-lg
                                                                                                border
                                                                                                transition
                                                                                                p-2
                                                                                                gap-2
                                                                                                hover:bg-slate-50"
                                                                                        `}
                                >
                                        <ArrowDownToLine size={10} /> Send back
                                </button>

                        </div>

                        <PropertyLabel> Stroke Color</PropertyLabel>
                        <div className="flex gap-2 items-center mt-2">
                                {
                                        COLORS.map((color) => {
                                                return <ColorSquare
                                                        color={color}
                                                        key={color}
                                                        active={selectedElement.strokeColor === color}
                                                        onClick={() => onPropertyChange && onPropertyChange?.("strokeColor", color)}
                                                />
                                        })
                                }
                        </div>


                        {
                                ["text"].includes(type) &&
                                <>



                                        <div >
                                                <div >
                                                        <PropertyLabel>Font Size </PropertyLabel>
                                                        <div className="flex gap-2 items-center mt-2">
                                                                <Select items={FONT_SIZE_OPTIONS} onValueChange={(value) => onPropertyChange && onPropertyChange("fontSize", value)}>
                                                                        <SelectTrigger className="w-[180px]">
                                                                                <SelectValue placeholder="Font Size" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                                <SelectGroup>
                                                                                        {FONT_SIZE_OPTIONS.map((item) => (
                                                                                                <SelectItem key={item.value} value={item.value} >
                                                                                                        {item.label}
                                                                                                </SelectItem>
                                                                                        ))}
                                                                                </SelectGroup>
                                                                        </SelectContent>
                                                                </Select>
                                                        </div>
                                                </div>

                                                <div >
                                                        <PropertyLabel>Font </PropertyLabel>
                                                        <div className="flex gap-2 items-center mt-2">
                                                                {
                                                                        [{ font: 2, value: "normal" }, { font: 1, value: "hand" }, { font: 3, value: "mono" }].map(({ font, value }) => {

                                                                                const selected = selectedElement.fontFamily === font;
                                                                                return <button
                                                                                        key={font}
                                                                                        onClick={() => onPropertyChange?.("fontFamily", font)}
                                                                                        className={`
                                                                                                flex
                                                                                                h-8
                                                                                                items-center
                                                                                                justify-center
                                                                                                rounded-lg
                                                                                                border
                                                                                                transition
                                                                                                p-2

                                                                                                ${selected ? "border-blue-300 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}
                                                                                        `}
                                                                                >
                                                                                        {value}
                                                                                </button>
                                                                        })
                                                                }
                                                        </div>
                                                </div>

                                        </div>

                                        <PropertyLabel>Text Align </PropertyLabel>
                                        <div className="flex gap-2 items-center mt-2">
                                                {
                                                        TEXT_ALIGN_OPTIONS.map((align: any) => {
                                                                return <TextStyleButton
                                                                        key={align.name}
                                                                        selected={selectedElement.textAlign === align.name}
                                                                        onClick={() => onPropertyChange("textAlign", align.name)}
                                                                        icon={<align.icon />}
                                                                />
                                                        })
                                                }
                                        </div>
                                </>

                        }

                        {
                                ["rectangle", "ellipse", "diamond", "line", "arrow"].includes(type) &&
                                <>


                                        <PropertyLabel>Stroke Style</PropertyLabel>

                                        <div className="flex gap-2 items-center mt-2">
                                                {
                                                        ["solid", "dashed", "dotted"].map((stroke: string) => {
                                                                return <StrokeStyleButton
                                                                        styleType={stroke}
                                                                        key={stroke}
                                                                        selected={selectedElement.strokeStyle === stroke}
                                                                        onClick={() => onPropertyChange && onPropertyChange?.("strokeStyle", stroke)}
                                                                />
                                                        })
                                                }
                                        </div>

                                        <PropertyLabel>Stroke width </PropertyLabel>
                                        <div className="flex gap-2 items-center mt-2">
                                                {
                                                        [1, 2, 3].map((width: number) => {

                                                                const selected = selectedElement.strokeWidth === width;
                                                                return <button
                                                                        key={width}
                                                                        onClick={() => onPropertyChange && onPropertyChange?.("strokeWidth", width)}
                                                                        className={`
                                                                                                flex
                                                                                                h-8
                                                                                                items-center
                                                                                                justify-center
                                                                                                rounded-lg
                                                                                                border
                                                                                                transition
                                                                                                p-2

                                                                                                ${selected ? "border-blue-300 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}
                                                                                        `}
                                                                >
                                                                        <div
                                                                                className={`w-8 bg-black`}
                                                                                style={{
                                                                                        height: `${2 * width}px`
                                                                                }}
                                                                        />
                                                                </button>
                                                        })
                                                }
                                        </div>
                                </>

                        }
                        {
                                ["rectangle", "ellipse", "diamond"].includes(type) &&
                                <>
                                        <PropertyLabel>Fill Color</PropertyLabel>
                                        <div className="flex gap-2 items-center mt-2">
                                                {
                                                        COLORS.map((color) => {
                                                                return <ColorSquare
                                                                        color={color}
                                                                        key={color}
                                                                        active={selectedElement.backgroundColor === color}
                                                                        onClick={() => onPropertyChange && onPropertyChange?.("backgroundColor", color)}
                                                                />
                                                        })
                                                }
                                        </div>
                                </>

                        }

                        <PropertyLabel>Opacity</PropertyLabel>
                        <Slider
                                defaultValue={[100]}
                                max={100}
                                step={1}
                                className="mx-auto w-full max-w-xs"
                                onValueChange={(value) => onPropertyChange && onPropertyChange("opacity", value as number[])}
                        />
                </HoverCardContent>
        </HoverCard>

}


export default FloatingBar