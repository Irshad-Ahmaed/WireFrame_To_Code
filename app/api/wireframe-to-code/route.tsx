import { db } from "@/configs/db";
import { WireFrameToCodeTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
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

export async function GET(req:NextResponse) {
    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl);
    const uid = searchParams?.get('uid');

    if(uid){
        const result = await db.select().from(WireFrameToCodeTable)
            .where(eq(WireFrameToCodeTable.uid, uid))

        return NextResponse.json(result[0]);
    }

    return NextResponse.json({result: "No Record Found"})
}