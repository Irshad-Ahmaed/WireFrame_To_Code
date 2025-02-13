"use client"

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const ViewCode = () => {
    const {uid} = useParams();
    
    const GetRecordInfo = async() => {
        const result = await axios.get(`/api/wireframe-to-code?uid=${uid}`);
        console.log(result.data);
        const resp = result?.data;

        if(resp?.code === null){
            GenerateCode();
        }

        if(resp?.error){
            console.log("No Record Found");
        }
    }

    const GenerateCode = async()=> {}

    useEffect(()=>{
        uid && GetRecordInfo();
    }, [uid])

  return (
    <div>ViewCode</div>
  )
}

export default ViewCode