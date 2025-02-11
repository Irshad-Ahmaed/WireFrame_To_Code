import { db } from "@/configs/db";
import { WireFrameToCodeTable } from "@/configs/schema";
import { NextRequest, NextResponse } from "next/server";

type WireframeToCodeDetails = {
    uid: string,
    imageUrl: string,
    model: string,
    description: string | null,
    email: string,
}

export async function POST(req:NextRequest){
    const body:WireframeToCodeDetails = await req.json() as WireframeToCodeDetails;

    const {description, imageUrl, model, uid, email} = body;

    const result = await db.insert(WireFrameToCodeTable).values({
        uid: uid,
        imageUrl: imageUrl,
        model: model,
        description: description,
        createdBy: email,
    }).returning({id: WireFrameToCodeTable.id});

    return NextResponse.json({result: result});
}