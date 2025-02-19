"use client"

import AppHeader from '@/app/_components/AppHeader'
import Constants from '@/data/Constants'
import axios from 'axios'
import { Loader2, Loader2Icon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SelectionDetails from '../_components/SelectionDetails'
import CodeEditor from '../_components/CodeEditor'

export interface Record{
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

    const [record, setRecord] = useState();
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(()=>{
        uid && GetRecordInfo();
    }, [uid]);

    // Fetches the Record on the basics of uid
    const GetRecordInfo = async() => {
        setIsCompleted(false);
        setViewCode('');
        setLoading(true);

        const result = await axios.get(`/api/wireframe-to-code?uid=${uid}`);
        console.log(result?.data);
        const resp = result?.data;
        setRecord(resp);

        if(resp?.code === null){
            // GenerateCode(resp);
        }

        if(resp?.error){
            console.log("No Record Found");
        }
    }

    // Generated Code Function
    const GenerateCode = async(res:Record)=> {
        setLoading(true);

        const resp = await fetch('/api/ai-model', {// axios is not work with streaming response
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                description: res?.description + ":" + Constants.PROMPT_OLD,
                model: res?.model,
                imageUrl: res?.imageUrl
            })
        });

        if(!resp.body) return;
        setLoading(false);

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        while(true){
            const {done, value} = await reader.read();
            if(done) break;

            const text = decoder.decode(value).replace('```Typescript', '').replace('```', '').replace(`jsx`, '');
            setViewCode((prev)=> prev+text);
            console.log(text);
        }

        setIsCompleted(true);
    }

  return (
    <div>
        <AppHeader hideSidebar={true}/>
        <div className='grid grid-cols-1 md:grid-cols-5 p-5 gap-10'>
            {/* Selection Details */}
            {
                record &&
                <div>
                    <SelectionDetails record={record} regenerateCode={()=>GetRecordInfo()} 
                        isCompleted={isCompleted}
                    />
                </div>
            }

            {/* Code editor */}
            <div className='col-span-4'>
                {
                    loading ?
                    <h2 className='gap-5 font-bold text-2xl text-center p-20 
                    flex items-center justify-center bg-slate-100 h-[80vh] rounded-xl'> 
                        <Loader2 className='animate-spin'/>Analyzing Wireframe...
                    </h2> 
                    :
                    <CodeEditor isCompleted={isCompleted} viewCode={viewCode}/>
                }
            </div>
        </div>
    </div>
  )
}

export default ViewCode