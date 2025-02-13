"use client"

import Constants from '@/data/Constants'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Record{
    id: number,
    description: string,
    model: string,
    code: JSON | null,
    imageUrl: string,
    createdBy: string
}

const ViewCode = () => {
    const {uid} = useParams();
    const [loading, setLoading] = useState(false);
    const [viewCode, setViewCode] = useState('');

    const GetRecordInfo = async() => {
        const result = await axios.get(`/api/wireframe-to-code?uid=${uid}`);
        console.log(result.data);
        const resp = result?.data;

        if(resp?.code === null){
            console.log('Called GenerateCode');
            GenerateCode(resp);
        }

        if(resp?.error){
            console.log("No Record Found");
        }
    }

    const GenerateCode = async(res:Record)=> {
        console.log('started GenerateCode', res);
        setLoading(true);

        const resp = await fetch('/api/ai-model', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                description: res?.description + ":" + Constants.PROMPT_OLD,
                model: res?.model,
                imageUrl: res?.imageUrl
            })
        });

        if(!resp.body) return;

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        while(true){
            const {done, value} = await reader.read();
            if(done) break;

            const text = decoder.decode(value).replace('```Typescript', '').replace('```', '');
            setViewCode((prev)=> prev+text);
            console.log(text);
        }

        setLoading(false);
    }

    useEffect(()=>{
        uid && GetRecordInfo();
    }, [uid])

  return (
    <div>
        ViewCode
        {loading && <p>{viewCode}</p>}
    </div>
  )
}

export default ViewCode