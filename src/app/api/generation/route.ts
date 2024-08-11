// import {
//   BedrockRuntimeClient,
//   InvokeModelCommand,
// } from "@aws-sdk/client-bedrock-runtime";
// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
// const AWS_REGION = process.env.AWS_REGION || '';
// const AWS_API_VERSION = process.env.AWS_API_VERSION || '';

import { NextRequest } from "next/server";

// const client = new BedrockRuntimeClient({
//   region: AWS_REGION,
//   apiVersion: AWS_API_VERSION,
//   credentials: {
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   },
// });
// const prompt = `a red futuristic shoe`;
// export async function GET() {
//   try {
//     const bodyContent = JSON.stringify({
//       textToImageParams: {
//         text: prompt,
//       },
//       taskType: "TEXT_IMAGE",
//       imageGenerationConfig: {
//         cfgScale: 8,
//         // if you want to specify a seed value
//         // seed: 0,
//         quality: "standard", // or premium
//         width: 512,
//         height: 512,
//         numberOfImages: 1,
//       },
//     });
//     const input = {
//       body: bodyContent,
//       contentType: "application/json",
//       accept: "application/json",
//       modelId: "amazon.titan-image-generator-v1",
//     };
//     const command = new InvokeModelCommand(input);
//     const response = await client.send(command);

//     const blobAdapter = response.body;
//     console.log(blobAdapter);
//     const textDecoder = new TextDecoder("utf-8");
//     const jsonString = textDecoder.decode(blobAdapter.buffer);

//     const parsedData = JSON.parse(jsonString);
//     console.log(parsedData);
//     return Response.json(parsedData);
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    console.log(prompt);
    const response = await fetch(`http://localhost:8055/amazon-bedrock`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    console.log(data);
    return Response.json(data);
  } catch (error) {
    console.log(error);
  }
}