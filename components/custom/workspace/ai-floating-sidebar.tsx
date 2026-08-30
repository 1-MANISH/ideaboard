import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
        Monitor,
        Network,
        PencilRulerIcon,
        Smartphone,
        Sparkles,
        Workflow,
        X,
        ArrowUp,
        LoaderIcon,
} from "lucide-react";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import axios from "axios";

type Props = {
        excalidrawApi: ExcalidrawImperativeAPI | null,
        onClose:()=>void
}


const AI_TOOLS = [
        {
                name: "Generate Diagrams",
                description: "Create visual diagrams",
                icon: PencilRulerIcon,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                prompt: `You are an expert visual diagrams generation agent. Your task is to convert the user's ideas into a clear,structured , professional diagrams. Instructions : 1.Understand the use's intent before generating.2. Identify the main entities, concept , steps , and relationship. 3. Create a a clean visual heirachy. 4. Use rectangles for main concepts or processes. 5. Use diamonds only for decisions. 6. Use arrows to show relqtionship or directions. 7. Keep labels short and relatable. 8. Avoid overlapping elements. 9. Maintain consistency spacing b/w elements. 10. Organize the diagrams from left to right or top to bottom depending on what is easiest to understand. 11. Add groups or sections when the diagram contains multiple categories. 12 Output only valid Exvalidraw-compatible JSON elements. 12. Do no include markdown , explanation or additional text outside the JSON`
        },
        {
                name: "Flowchart",
                description: "Visualize workflows",
                icon: Workflow,
                color: "text-purple-600",
                bgColor: "bg-purple-50",
                prompt: `
You are an expert workflow and flowchart generation agent working with Excalidraw.

Convert the user's process, workflow, business logic, or sequence of actions into a professional and easy-to-follow flowchart.

PRIMARY GOAL:
Represent the user's workflow visually so that someone can understand the process by following the arrows from beginning to end.

FLOWCHART STRUCTURE:
1. Identify the starting point.
2. Identify each meaningful process/action.
3. Identify decisions and their possible outcomes.
4. Identify the final/end states.
5. Determine the correct sequence before creating elements.
6. Create a clear directional flow.
7. Prefer top-to-bottom flow for sequential workflows.
8. Use left-to-right flow when it makes branching easier to understand.
9. Keep the main path visually obvious.

ELEMENT RULES:
- Use rounded rectangles for Start and End.
- Use rectangles for actions, processes, tasks, and operations.
- Use diamonds ONLY for decisions or conditions.
- Use arrows to connect workflow steps.
- Add short labels such as "Yes", "No", "Success", "Retry", or "Approved" near decision branches.
- Use text elements for step names.
- Keep each process label short.
- Do not put large paragraphs inside nodes.

DECISION RULES:
1. A diamond should represent an actual question or condition.
2. Each decision should have clearly labeled outgoing paths.
3. Avoid more than 3 outgoing branches from a decision unless the user's process explicitly requires it.
4. Make the primary/success path visually easy to follow.
5. Avoid crossing arrows whenever possible.
6. If a workflow loops, make the loop visually obvious without overlapping nodes.

LAYOUT:
1. Use consistent vertical and horizontal spacing.
2. Keep nodes aligned.
3. Maintain at least 40px of visual spacing between neighboring nodes.
4. Keep arrows outside nodes whenever possible.
5. Avoid overlapping text and shapes.
6. Keep the entire flowchart within a reasonable canvas.
7. Use integer coordinates and dimensions.

EXCALIDRAW REQUIREMENTS:
- Output element skeletons accepted by convertToExcalidrawElements().
- Use only:
  rectangle
  diamond
  ellipse
  text
  arrow
  line
- Every element must have a unique id.
- Shapes must have x, y, width, height.
- Arrows must contain x, y, width, height, and points.
- Text must have text, x, y, and fontSize.
- Use roughness 0.
- Prefer strokeWidth 1 or 2.
- Use solid fills.
- Do not use HTML, SVG, images, markdown, or unsupported Excalidraw elements.

OUTPUT:
Return ONLY a valid JSON array.
No markdown.
No code fences.
No explanations.
No comments.
No text outside the JSON array.

`,
        },
        {
                name: "Architecture",
                description: "Design system architecture",
                icon: Network,
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                prompt: `
You are a senior software architect and technical architecture diagram generation agent working with Excalidraw.

Convert the user's technical requirements into a professional system architecture diagram.

PRIMARY OBJECTIVE:
Show the major components of the system, their responsibilities, data flow, dependencies, integrations, and external systems.

UNDERSTANDING THE REQUEST:
1. Identify users or external actors.
2. Identify frontend/client applications.
3. Identify backend services.
4. Identify APIs and communication layers.
5. Identify databases and persistent storage.
6. Identify queues, caches, storage systems, or background workers when relevant.
7. Identify third-party services and external integrations.
8. Identify authentication/authorization components when relevant.
9. Identify important data flows.
10. Do not invent infrastructure that is not reasonably implied by the user's request.

ARCHITECTURE NODE RULES:
- Use rectangles for services, applications, APIs, workers, and components.
- Use cylinders/ellipse-style shapes for databases or storage when appropriate.
- Use rectangles with clear labels for external services.
- Use arrows for data flow and dependencies.
- Use text labels on arrows when the communication type matters, such as:
  "HTTP"
  "REST API"
  "WebSocket"
  "Events"
  "SQL"
  "Queue"
- Use larger container rectangles to visually group related components when useful.
- Keep internal components inside their logical system boundary.
- Use concise component names.

ARCHITECTURE LAYERS:
When applicable, organize the architecture into logical layers such as:

Client
↓
API / Gateway
↓
Application Services
↓
Data / Infrastructure

For distributed systems, organize components based on their responsibility rather than forcing everything into layers.

RELATIONSHIP RULES:
1. Arrows should clearly show direction.
2. Do not connect every component to every other component.
3. Only show meaningful relationships.
4. Avoid crossing arrows where possible.
5. Keep arrows outside component boxes.
6. Use one consistent direction for major data flows.
7. Avoid duplicate connections.

LAYOUT:
1. Prefer left-to-right architecture diagrams.
2. Keep related components close together.
3. Use consistent spacing.
4. Use larger grouping containers for logical domains.
5. Do not overlap components.
6. Keep labels readable.
7. Maintain enough whitespace around groups.
8. Keep the complete architecture within a reasonable canvas size.

EXCALIDRAW REQUIREMENTS:
- Output only element skeletons accepted by convertToExcalidrawElements().
- Use primarily:
  rectangle
  ellipse
  text
  arrow
  line
- Use diamond only if the architecture contains an actual decision.
- Every element must have a unique id.
- Shapes require x, y, width, and height.
- Arrows require x, y, width, height, and points.
- Text requires x, y, text, and fontSize.
- Use roughness 0.
- Use solid fills.
- Use strokeWidth 1 or 2.
- Use consistent colors for similar architectural layers.
- Do not use HTML, SVG, images, markdown, or unsupported element types.

OUTPUT:
Return ONLY a valid JSON array.
No markdown.
No code fences.
No explanation.
No comments.
No text outside the JSON array.

`,
        },
        {
                name: "Web Mockup",
                description: "Generate website wireframes",
                icon: Monitor,
                color: "text-cyan-600",
                bgColor: "bg-cyan-50",
                prompt: `
You are an expert UI/UX designer and website wireframe generation agent working with Excalidraw.

Convert the user's website idea into a clean, professional, low-fidelity website wireframe using only Excalidraw elements.

PRIMARY OBJECTIVE:
Create a realistic website layout that communicates the structure, hierarchy, navigation, content areas, and interactions of the requested website.

FIRST UNDERSTAND:
1. Identify the type of website.
2. Identify the target user.
3. Identify the primary purpose of the page.
4. Identify important sections requested by the user.
5. Determine the most appropriate page layout.
6. If the user does not specify a page structure, choose a conventional structure appropriate for the website.

WEB PAGE STRUCTURE:
When appropriate, consider:
- Header
- Logo
- Navigation
- Search
- Hero section
- Primary CTA
- Secondary CTA
- Content sections
- Cards
- Sidebar
- Forms
- Tables
- Testimonials
- Pricing
- Footer

Do not add every section automatically. Only include sections that make sense for the user's request.

WIREFRAME RULES:
1. Create one main browser/page frame.
2. Use rectangles for sections and containers.
3. Use smaller rectangles for buttons.
4. Use text elements for headings, labels, navigation, and important content.
5. Use thin rectangles or lines as placeholder content.
6. Use repeated cards when the page requires lists or grids.
7. Use consistent spacing and alignment.
8. Use clear visual hierarchy.
9. Keep the wireframe low-fidelity but visually polished.
10. Avoid excessive detail.
11. Do not create actual images.
12. Represent image areas using placeholder rectangles.
13. Represent avatars using circles or ellipses.
14. Keep button labels short.
15. Avoid long paragraphs.
16. Use realistic placeholder text relevant to the user's requested product.

RESPONSIVE THINKING:
Design the requested page as a desktop web layout unless the user explicitly requests a different viewport.
Use a reasonable desktop canvas width.
Keep content aligned to a central page/container area.

LAYOUT:
1. Align major sections to a consistent grid.
2. Maintain consistent margins and padding.
3. Keep cards evenly spaced.
4. Avoid overlapping elements.
5. Ensure text fits within its visual container.
6. Use whitespace intentionally.
7. Keep the overall design balanced.

EXCALIDRAW REQUIREMENTS:
- Output only element skeletons accepted by convertToExcalidrawElements().
- Use:
  rectangle
  ellipse
  text
  line
  arrow
- Do not use HTML.
- Do not use SVG.
- Do not use CSS.
- Do not use images.
- Do not use unsupported Excalidraw element types.
- Every element must have a unique id.
- Shapes require x, y, width, and height.
- Text requires x, y, text, and fontSize.
- Use roughness 0.
- Prefer strokeWidth 1.
- Use subtle solid background fills.
- Keep all elements within the main page frame.
- Do not overlap elements unless intentional.

OUTPUT:
Return ONLY a valid JSON array.
No markdown.
No code fences.
No explanation.
No comments.
No text outside the JSON array.

`,
        },
        {
                name: "Mobile Mockup",
                description: "Generate mobile wireframes",
                icon: Smartphone,
                color: "text-pink-600",
                bgColor: "bg-pink-50",
                prompt: `
You are an expert mobile UI/UX designer and mobile wireframe generation agent working with Excalidraw.

Convert the user's mobile app idea into a clean, professional mobile application wireframe using Excalidraw elements.

PRIMARY OBJECTIVE:
Create a realistic mobile screen layout that communicates the structure, navigation, content hierarchy, controls, and interactions requested by the user.

FIRST UNDERSTAND:
1. Identify the mobile application's purpose.
2. Identify the target user.
3. Identify the primary task the user needs to accomplish.
4. Identify the requested screen or screens.
5. Identify important content and controls.
6. Determine the most appropriate mobile layout.
7. If multiple screens are requested, create separate phone frames and show relationships between them.

MOBILE SCREEN STRUCTURE:
When relevant, consider:
- Status bar
- App header
- Back button
- Title
- Navigation
- Search
- Tabs
- Cards
- Lists
- Forms
- Input fields
- Buttons
- Images/placeholders
- Avatars
- Bottom navigation
- Floating action button
- Empty states
- Loading states

Do not automatically include every element. Only include elements relevant to the user's request.

WIREFRAME RULES:
1. Represent each mobile screen using a rounded rectangle.
2. Use a consistent mobile viewport ratio.
3. Keep all screen content inside its corresponding phone frame.
4. Use rectangles for cards, buttons, input fields, and containers.
5. Use ellipses for avatars, icons, or circular controls.
6. Use text elements for labels and headings.
7. Use thin rectangles or lines for placeholder content.
8. Use repeated components consistently.
9. Keep touch targets visually clear.
10. Keep button labels concise.
11. Avoid large paragraphs.
12. Use realistic placeholder text relevant to the user's request.
13. Maintain clear spacing between interactive elements.
14. Create a strong visual hierarchy.
15. Avoid overcrowding the mobile screen.

MULTI-SCREEN RULES:
If multiple screens are requested:
1. Create each screen as a separate phone frame.
2. Keep all phone frames the same size.
3. Arrange screens horizontally with consistent spacing.
4. Add arrows between screens when navigation needs to be communicated.
5. Label navigation relationships when useful.
6. Do not connect unrelated screens.

LAYOUT:
1. Use a consistent mobile width and height.
2. Keep content aligned to a common horizontal margin.
3. Maintain consistent vertical spacing.
4. Ensure text fits inside its container.
5. Avoid overlapping elements.
6. Keep enough whitespace between controls.
7. Make the most important action visually prominent.

EXCALIDRAW REQUIREMENTS:
- Output only element skeletons accepted by convertToExcalidrawElements().
- Use:
  rectangle
  ellipse
  text
  line
  arrow
- Use rounded rectangles for phone frames and major UI containers.
- Do not use HTML.
- Do not use SVG.
- Do not use CSS.
- Do not use images.
- Do not use unsupported Excalidraw element types.
- Every element must have a unique id.
- Shapes require x, y, width, and height.
- Text requires x, y, text, and fontSize.
- Arrows require x, y, width, height, and points.
- Use roughness 0.
- Prefer strokeWidth 1.
- Use subtle solid fills.
- Keep all UI elements within their screen frame.

OUTPUT:
Return ONLY a valid JSON array.
No markdown.
No code fences.
No explanation.
No comments.
No text outside the JSON array.
`,
        },
]

const AI_PLACEHOLDER_IDS ={
        container:"ai-placeholder-container",
        text1:"ai-placeholder-text-1",
        text2:"ai-placeholder-text-2",
        rectangle1:"ai-placeholder-rectangle-1",
        rectangle2:"ai-placeholder-rectangle-2",
        rectangle3:"ai-placeholder-rectangle-3",

}
function AIFloatingSidebar({
        excalidrawApi,
        onClose
}: Props) {



        const [selectedTool, setSelectedTool] = useState("Generate Diagrams")
        const [prompt, setPrompt] = useState("")
        const [loading,setLoading] = useState(false)


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

        const addAiPlaceholder = () => {
                if (!excalidrawApi) return

                const position = getEmptyCanvasPosition()

                const placeHolderElements = convertToExcalidrawElements([
                        {
                                type: "rectangle",
                                id: AI_PLACEHOLDER_IDS.container,
                                x: position.x,
                                y: position.y,
                                width: 420,
                                height: 250,
                                backgroundColor: "#f5f3ff",
                                strokeColor: "#8b5cf6",
                                fillStyle: "solid",
                                strokeWidth: 2,
                                roughness: 0,
                                roundness: {
                                        type: 3,
                                },
                        },

                        {
                                id:AI_PLACEHOLDER_IDS.text1,
                                type: "text",
                                x: position.x + 28,
                                y: position.y + 28,
                                text: "🪄 Generating with AI",
                                fontSize: 22,
                                strokeColor: "#6d28d9",
                        },

                        {
                                id:AI_PLACEHOLDER_IDS.text2,
                                type: "text",
                                x: position.x + 60,
                                y: position.y + 65,
                                text: "Preparing your things....",
                                fontSize: 16,
                                strokeColor: "#6b7280",
                        },

                        // Skeleton loading bar 1
                        {
                                id:AI_PLACEHOLDER_IDS.rectangle1,
                                type: "rectangle",
                                x: position.x + 60,
                                y: position.y + 105,
                                width: 250,
                                height: 12,
                                backgroundColor: "#ddd6fe",
                                strokeColor: "transparent",
                                fillStyle: "solid",
                                strokeWidth: 0,
                                roughness: 0,
                                roundness: {
                                        type: 3,
                                },
                        },

                        // Skeleton loading bar 2
                        {
                                id:AI_PLACEHOLDER_IDS.rectangle2,
                                type: "rectangle",
                                x: position.x + 60,
                                y: position.y + 130,
                                width: 190,
                                height: 12,
                                backgroundColor: "#ddd6fe",
                                strokeColor: "transparent",
                                fillStyle: "solid",
                                strokeWidth: 0,
                                roughness: 0,
                                roundness: {
                                        type: 3,
                                },
                        },

                        // Skeleton loading bar 3
                        {
                                id:AI_PLACEHOLDER_IDS.rectangle3,
                                type: "rectangle",
                                x: position.x + 60,
                                y: position.y + 155,
                                width: 130,
                                height: 12,
                                backgroundColor: "#ddd6fe",
                                strokeColor: "transparent",
                                fillStyle: "solid",
                                strokeWidth: 0,
                                roughness: 0,
                                roundness: {
                                        type: 3,
                                },
                        },
                ],{
                        regenerateIds:false
                });

                const currentElements = excalidrawApi.getSceneElements()

                excalidrawApi.updateScene({
                        elements: [
                                ...currentElements,
                                ...placeHolderElements
                        ]
                })
        }
        const removeAiPlaceholder =  () =>{
                if(!excalidrawApi)return

                const placeholderIds = Object.values(AI_PLACEHOLDER_IDS)

                const elements = excalidrawApi.getSceneElements()

                const updatedElements = elements.filter(ele=>!placeholderIds.includes(ele.id))

                excalidrawApi.updateScene({
                        elements:updatedElements
                })
        }

        const getConnectionPoints = (fromNode:any,toNode:any,origin:{x:number,y:number})=>{

                const fromX = origin.x = Number(fromNode.x || 0)
                const fromY = origin.y = Number(fromNode.y || 0)
                const fromWidth = Number(fromNode.width || 200)
                const fromHeight = Number(fromNode.height || 80)

                const toX = Number(toNode.x || 0)
                const toY = Number(toNode.y || 0)
                const toWidth = Number(toNode.width || 200)
                const toHeight = Number(toNode.height || 80)

                const fromCenterX = fromX + fromWidth/2
                const fromCenterY = fromY + fromHeight/2

                const toCenterX = toX + toWidth/2
                const toCenterY = toY + toHeight/2

                const dx = toCenterX - fromCenterX
                const dy = toCenterY - fromCenterY

                // vertical connection

                if(Math.abs(dy)>=Math.abs(dx)){
                        if(dy>0){
                                return {
                                        startX:fromCenterX,
                                        startY:fromY+fromHeight,
                                        endX:toCenterX,
                                        endY:toY
                                }
                        }

                        return {
                                startX:fromCenterX,
                                startY:fromY,
                                endX:toCenterX,
                                endY:toY+toHeight
                        }
                }

                // horizontal connection
                if(dx>0){
                        return {
                                startX:fromX+fromWidth,
                                startY:fromCenterY,
                                endX:toX,
                                endY:toCenterY
                        }
                }

                return {
                        startX:fromX,
                        startY:fromCenterY,
                        endX:toX+toWidth,
                        endY:toCenterY
                }

        }

        const renderAIDiagram = (diagram:any)=>{
                if(!excalidrawApi)return

                const origin  = getEmptyCanvasPosition()

                const aiElements = diagram?.elements || []
                const aiConnections = diagram?.connections || []

                if(!aiElements.length)return

                //HELPER - FIND AI NODE
                const getNode = (id:string)=>{
                        return aiElements.find((ele:any)=>ele.id===id)
                }


                // CREATE SHAPES

                const shapeElements  =  aiElements.flatMap((element:any)=>{

                        if(!element.type || !element.id)return []

                        const baseElement = {
                                id:element.id,
                                type:element.type,
                                x:element.x,
                                y:element.y,
                                width:element.width,
                                height:element.height,
                                strokeColor:element.strokeColor || "#1e1e1e",
                                backgroundColor:element.backgroundColor || "transparent",
                                storkWidth:Number(element.strokeWidth) || 2,
                                strokeStyle:element.strokeStyle || "solid",
                                fillStyle:element.fillStyle ?? "solid",
                                roughness:element.roughness ?? 1,
                                opacity:element.opacity ?? 100,
                                roundness:element.roundness ?? {
                                        type:1,
                                        value:0
                                }

                        } 

                        return baseElement
                })

                console.log(shapeElements)

                excalidrawApi.updateScene({
                        elements:aiElements
                })


        }
        const onClickGenerate = async () => {

                if(!excalidrawApi)return

                setLoading(true)
                try {
                        addAiPlaceholder()

                        const currentAITool = AI_TOOLS.find(tool=>tool.name===selectedTool)
                        
                        if(!currentAITool || !prompt)return

                        const response = await axios.post('/api/ai',{
                                userInput:prompt,
                                type:currentAITool.name,
                                systemPrompt:currentAITool.prompt
                        })

                        removeAiPlaceholder()

                        if(!response.data.diagramResult)return

                        renderAIDiagram(response.data.diagramResult)
                        
                } catch (error) {

                }
                finally{
                        setLoading(false)
                }
        }

        return (
                <div
                        className="
                                absolute right-4 bottom-20 z-[1000]
                                w-[380px]
                                overflow-hidden
                                rounded-2xl
                                border border-gray-200
                                bg-white
                                shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                        "
                >

                        <div className="px-5 pt-5">
                                <div className="flex items-start justify-between">
                                        <div>
                                                <div className="flex items-center gap-2">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-purple-400">
                                                                <Sparkles className="h-4 w-4 text-white" />
                                                        </div>

                                                        <h2 className="text-[17px] font-semibold tracking-tight text-gray-900">
                                                                AI Helper
                                                        </h2>
                                                </div>

                                                <p className="mt-2 text-xs text-gray-500">
                                                        Turn your ideas into visual content
                                                </p>
                                        </div>

                                        <button
                                                type="button"
                                                className="
              flex h-7 w-7 items-center justify-center
              rounded-md text-gray-400
              transition-colors
              hover:bg-gray-100 hover:text-gray-700
            "
                                                onClick={onClose}
                                        >
                                                <X className="h-4 w-4" />
                                        </button>
                                </div>
                        </div>


                        <div className="mx-5 mt-5 border-t border-gray-100" />


                        <div className="px-5 pt-4">
                                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                        What do you want to create?
                                </p>

                                <div className="grid grid-cols-2 gap-2">
                                        {AI_TOOLS.map((tool) => {
                                                const Icon = tool.icon;
                                                const isSelected = selectedTool === tool.name;

                                                return (
                                                        <button
                                                                key={tool.name}
                                                                type="button"
                                                                onClick={() =>{
                                                                        setSelectedTool(tool.name)
                                                                        
                                                                }}
                                                                className={`
                                                                group relative flex min-h-[62px] items-center gap-3
                                                                rounded-xl border p-2.5 text-left
                                                                transition-all duration-150
                                                                ${isSelected
                                                                                ? "border-purple-200 bg-purple-50/50 shadow-sm"
                                                                                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                                                                        }
                                                                `}
                                                        >
                                                                {/* Icon */}
                                                                <div
                                                                        className={`
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-lg
                    ${tool.bgColor}
                    ${tool.color}
                  `}
                                                                >
                                                                        <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />
                                                                </div>

                                                                {/* Text */}
                                                                <div className="min-w-0 pr-2">
                                                                        <p
                                                                                className={`
                      truncate text-[12px] font-medium
                      ${isSelected
                                                                                                ? "text-gray-900"
                                                                                                : "text-gray-700"
                                                                                        }
                    `}
                                                                        >
                                                                                {tool.name}
                                                                        </p>

                                                                        <p className="mt-0.5 truncate text-[10px] text-gray-400">
                                                                                {tool.description}
                                                                        </p>
                                                                </div>

                                                                {/* Selected indicator */}
                                                                {isSelected && (
                                                                        <span
                                                                                className="
                      absolute right-2 top-2
                      h-1.5 w-1.5
                      rounded-full
                      bg-purple-600
                    "
                                                                        />
                                                                )}
                                                        </button>
                                                );
                                        })}
                                </div>
                        </div>


                        <div className="px-5 pb-5 pt-5">
                                <div className="mb-2 flex items-center justify-between">
                                        <label className="text-[12px] font-semibold text-gray-800">
                                                Describe your idea
                                        </label>

                                        <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                                </div>

                                <div
                                        className="
                                                overflow-hidden rounded-xl
                                                border border-gray-200
                                                bg-gray-50/50
                                                transition-all
                                                focus-within:border-purple-300
                                                focus-within:bg-white
                                                focus-within:ring-2
                                                focus-within:ring-purple-100
                                                "
                                >
                                        <Textarea
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                placeholder={`E.g. Create a ${selectedTool.toLowerCase()} for a customer onboarding flow...`}
                                                className="
                                                        min-h-[110px]
                                                        resize-none
                                                        border-0
                                                        bg-transparent
                                                        px-3.5
                                                        py-3
                                                        text-xs
                                                        leading-relaxed
                                                        shadow-none
                                                        focus-visible:ring-0
                                                "
                                        />


                                        <div className="flex items-center justify-between px-3 pb-2.5">
                                                <div
                                                        className="
                                                                rounded-md
                                                                border border-gray-200
                                                                bg-white
                                                                px-2
                                                                py-1
                                                                text-[10px]
                                                                font-medium
                                                                text-gray-500
                                                        "
                                                >
                                                        {selectedTool}
                                                </div>

                                                <Button
                                                        type="button"
                                                        disabled={!prompt.trim() || loading}
                                                        className="
                                                                h-8
                                                                rounded-lg
                                                                bg-gray-900
                                                                px-3
                                                                text-[11px]
                                                                font-medium
                                                                shadow-sm
                                                                hover:bg-gray-800
                                                                disabled:cursor-not-allowed
                                                                disabled:opacity-40
                                                        "
                                                        onClick={onClickGenerate}
                                                        
                                                >
                                                        <span>
                                                                {
                                                                loading? 
                                                                <LoaderIcon className="animate-spin" /> : 
                                                                "Generate"
                                                                }
                                                        </span>
                                                        <ArrowUp className="ml-1.5 h-3.5 w-3.5" />
                                                </Button>
                                        </div>
                                </div>

                                <p className="mt-2 text-[10px] text-gray-400">
                                        AI generated content can be edited afterwards
                                </p>
                        </div>
                </div>
        );
}

export default AIFloatingSidebar;