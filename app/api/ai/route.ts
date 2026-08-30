import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from '@google/genai';


const ai = new GoogleGenAI({
    apiKey: process.env['GEMINI_API_KEY'],
})

export async function POST(req:NextRequest){

        const {userInput,type,systemPrompt} = await req.json()

        if(!userInput || !type || !systemPrompt) 
                return NextResponse.json({
                                error:"Please provide all  information to generate content"
                        })

        const finalPrompt = `${systemPrompt} User Request : ${userInput}.

        CANVAS GENERATION RULES:=

        Create a professional ${type} .
        Coordinate system start from x=0 to y=0

        Every element must contain:
                        -unique id
                        -type
                        -x
                        -y
        Width and height whenever applicable
      Use appropriate :
                        -backgroundColor
                        -strokeColor
                        -fillColor
                        -roundness
                        -roughness
                        -opacity
                        -font settings

                        Use hex colors
                        Avoid overlapping elements
                        Keep enough spacing b/w elements.
                        Connections must reference valid elements IDs.
                        DO not include markdown in response
        `

        // const response = await ai.models.generateContent(
        //         {
        //                 model:"gemini-3.7-flash",
        //                 contents:finalPrompt,
        //                 config:{
        //                         responseMimeType:'application/json',
        //                         responseSchema:responseSchema
        //                 }
        //         }
        // )

        // const diagramResult = JSON.parse(response.text || '{}')
        const diagramResult = testResult

        return NextResponse.json({
                success:true,
                diagramResult
        })


}

const responseSchema = {
        type:Type.OBJECT,
        properties:{
                title:{type:Type.STRING},
                width:{type:Type.STRING},
                height:{type:Type.STRING},
                elements:{
                        type:Type.ARRAY,
                        items:{
                                type:Type.OBJECT,
                                properties:{
                                        id:{type:Type.STRING},
                                        type:{type:Type.STRING},
                                        x:{type:Type.NUMBER},
                                        y:{type:Type.NUMBER},
                                        width:{type:Type.NUMBER},
                                        height:{type:Type.NUMBER},
                                        text:{type:Type.STRING},
                                        strokeStyle:{type:Type.STRING},
                                        fillStyle:{type:Type.STRING},
                                        backgroundColor:{type:Type.STRING},
                                        roughness:{type:Type.NUMBER},
                                        strokeWidth:{type:Type.NUMBER},
                                        opacity:{type:Type.NUMBER},
                                        fontSize:{type:Type.NUMBER},
                                        fontFamily:{type:Type.NUMBER},
                                        textAlign:{type:Type.NUMBER},
                                        verticalAlign:{type:Type.NUMBER},
                                        roundness:{type:Type.NUMBER},
                                },
                                required:[
                                        "id","type","x","y"
                                ]
                        }
                },

                connections:{
                        type:Type.ARRAY,
                        items:{
                                type:Type.OBJECT,
                                properties:{
                                        id:{type:Type.STRING},
                                        type:{type:Type.STRING},
                                        from:{type:Type.STRING},
                                        to:{type:Type.STRING },
                                        x:{type:Type.NUMBER},
                                        y:{type:Type.NUMBER},
                                        width:{type:Type.NUMBER},
                                        height:{type:Type.NUMBER},
                                        text:{type:Type.STRING},
                                        strokeStyle:{type:Type.STRING},
                                        fillStyle:{type:Type.STRING},
                                        backgroundColor:{type:Type.STRING},
                                        roughness:{type:Type.NUMBER},
                                        strokeWidth:{type:Type.NUMBER},
                                        opacity:{type:Type.NUMBER},
                                        fontSize:{type:Type.NUMBER},
                                        fontFamily:{type:Type.NUMBER},
                                        textAlign:{type:Type.NUMBER},
                                        verticalAlign:{type:Type.NUMBER},
                                        roundness:{type:Type.NUMBER},

                                }
                        }
                }
        },

        required:[
                "title",
                "elements",
                "connections"
        ]
}

const testResult = {
  "title": "Bubble Sort Algorithm",
  "width": "900",
  "height": "1200",
  "elements": [
    {
      "id": "start",
      "type": "ellipse",
      "x": 320,
      "y": 40,
      "width": 260,
      "height": 70,
      "text": "Start",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "#dcfce7",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "input-array",
      "type": "rectangle",
      "x": 270,
      "y": 160,
      "width": 360,
      "height": 80,
      "text": "Input Array",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "#dbeafe",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "initialize-i",
      "type": "rectangle",
      "x": 250,
      "y": 290,
      "width": 400,
      "height": 80,
      "text": "Set i = 0",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "#f3e8ff",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "outer-condition",
      "type": "diamond",
      "x": 270,
      "y": 420,
      "width": 360,
      "height": 130,
      "text": "i < n - 1 ?",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "#fef3c7",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "initialize-j",
      "type": "rectangle",
      "x": 250,
      "y": 620,
      "width": 400,
      "height": 80,
      "text": "Set j = 0",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "#f3e8ff",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "inner-condition",
      "type": "diamond",
      "x": 270,
      "y": 750,
      "width": 360,
      "height": 130,
      "text": "j < n - i - 1 ?",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "#fef3c7",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "compare",
      "type": "diamond",
      "x": 270,
      "y": 950,
      "width": 360,
      "height": 130,
      "text": "array[j] > array[j + 1] ?",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "#fef3c7",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "swap",
      "type": "rectangle",
      "x": 60,
      "y": 1130,
      "width": 280,
      "height": 80,
      "text": "Swap array[j] and array[j + 1]",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "#fee2e2",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 15,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "increment-j",
      "type": "rectangle",
      "x": 600,
      "y": 1130,
      "width": 240,
      "height": 80,
      "text": "Increment j",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "#e0f2fe",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "sorted",
      "type": "ellipse",
      "x": 320,
      "y": 1350,
      "width": 260,
      "height": 70,
      "text": "Array Sorted",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "#dcfce7",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    }
  ],
  "connections": [
    {
      "id": "conn-start-input",
      "type": "arrow",
      "from": "start",
      "to": "input-array",
      "x": 450,
      "y": 110,
      "width": 0,
      "height": 50,
      "text": "",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "transparent",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "conn-input-init",
      "type": "arrow",
      "from": "input-array",
      "to": "initialize-i",
      "x": 450,
      "y": 240,
      "width": 0,
      "height": 50,
      "text": "",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "transparent",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "conn-init-outer",
      "type": "arrow",
      "from": "initialize-i",
      "to": "outer-condition",
      "x": 450,
      "y": 370,
      "width": 0,
      "height": 50,
      "text": "",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "transparent",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "conn-outer-yes",
      "type": "arrow",
      "from": "outer-condition",
      "to": "initialize-j",
      "x": 450,
      "y": 550,
      "width": 0,
      "height": 70,
      "text": "Yes",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "transparent",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "conn-inner-yes",
      "type": "arrow",
      "from": "inner-condition",
      "to": "compare",
      "x": 450,
      "y": 880,
      "width": 0,
      "height": 70,
      "text": "Yes",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "transparent",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "conn-compare-yes",
      "type": "arrow",
      "from": "compare",
      "to": "swap",
      "x": 270,
      "y": 1015,
      "width": -70,
      "height": 115,
      "text": "Yes",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "transparent",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "conn-compare-no",
      "type": "arrow",
      "from": "compare",
      "to": "increment-j",
      "x": 630,
      "y": 1015,
      "width": 90,
      "height": 115,
      "text": "No",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "transparent",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "conn-swap-increment",
      "type": "arrow",
      "from": "swap",
      "to": "increment-j",
      "x": 340,
      "y": 1170,
      "width": 260,
      "height": 0,
      "text": "",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "transparent",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "conn-increment-inner",
      "type": "arrow",
      "from": "increment-j",
      "to": "inner-condition",
      "x": 720,
      "y": 1130,
      "width": 0,
      "height": -315,
      "text": "",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "transparent",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "conn-inner-no",
      "type": "arrow",
      "from": "inner-condition",
      "to": "outer-condition",
      "x": 630,
      "y": 815,
      "width": 150,
      "height": -330,
      "text": "No",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "transparent",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    },
    {
      "id": "conn-outer-no",
      "type": "arrow",
      "from": "outer-condition",
      "to": "sorted",
      "x": 630,
      "y": 485,
      "width": 170,
      "height": 865,
      "text": "No",
      "strokeStyle": "solid",
      "fillStyle": "solid",
      "backgroundColor": "transparent",
      "roughness": 0,
      "strokeWidth": 2,
      "opacity": 100,
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": 1,
      "verticalAlign": 1,
      "roundness": 3
    }
  ]
}

