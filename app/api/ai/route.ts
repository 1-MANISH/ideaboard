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

        const finalPrompt = `${systemPrompt} User Request : ${userInput}.`

        const response = await ai.models.generateContent(
                {
                        model:"gemini-3.7-flash",
                        contents:finalPrompt,
                        config:{
                                responseMimeType:'application/json',
                                responseSchema:responseSchema2
                        }
                }
        )

        const diagramResult = JSON.parse(response.text || '{}')

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
                                        x:{type:Type.NUMBER},
                                        y:{type:Type.NUMBER},
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
        }
}

const responseSchema2 = {
  type: Type.ARRAY,
  description: "A list of Excalidraw-compatible element skeletons.",
  items: {
    type: Type.OBJECT,
    properties: {
      type: {
        type: Type.STRING,
        description: "The Excalidraw element type.",
        enum: [
          "rectangle",
          "diamond",
          "ellipse",
          "text",
          "arrow",
          "line",
        ],
      },

      x: {
        type: Type.NUMBER,
        description: "Horizontal position of the element on the canvas.",
      },

      y: {
        type: Type.NUMBER,
        description: "Vertical position of the element on the canvas.",
      },

      width: {
        type: Type.NUMBER,
        description: "Width of the element.",
      },

      height: {
        type: Type.NUMBER,
        description: "Height of the element.",
      },

      text: {
        type: Type.STRING,
        description:
          "Text content. Required for text elements and optional for other elements.",
      },

      fontSize: {
        type: Type.NUMBER,
        description: "Font size for text elements.",
      },

      strokeColor: {
        type: Type.STRING,
        description: "Hex color used for the element stroke.",
      },

      backgroundColor: {
        type: Type.STRING,
        description: "Hex color used for the element background.",
      },

      fillStyle: {
        type: Type.STRING,
        description: "Excalidraw fill style.",
        enum: ["solid", "hachure", "cross-hatch", "dots"],
      },

      strokeWidth: {
        type: Type.NUMBER,
        description: "Width of the element stroke.",
      },

      roughness: {
        type: Type.NUMBER,
        description: "Excalidraw roughness value.",
      },

      roundness: {
        type: Type.OBJECT,
        properties: {
          type: {
            type: Type.NUMBER,
            description: "Excalidraw roundness type.",
          },
        },
      },

      points: {
        type: Type.ARRAY,
        description:
          "Points used by line and arrow elements. First point should normally be [0,0].",
        items: {
          type: Type.ARRAY,
          items: {
            type: Type.NUMBER,
          },
        },
      },

      startArrowhead: {
        type: Type.STRING,
        description: "Arrowhead style at the beginning of an arrow.",
        enum: ["arrow", "bar", "dot", "triangle", null],
      },

      endArrowhead: {
        type: Type.STRING,
        description: "Arrowhead style at the end of an arrow.",
        enum: ["arrow", "bar", "dot", "triangle", null],
      },
    },

    required: [
      "type",
      "x",
      "y",
    ],
  },
};