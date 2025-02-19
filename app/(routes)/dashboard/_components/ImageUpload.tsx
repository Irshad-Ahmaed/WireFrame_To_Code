"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, Sparkles, Upload, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
import axios from "axios";
import { v4 as uuid4 } from 'uuid';
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import Constants from "@/data/Constants";

const ImageUpload = () => {
  // States:
  const [previewURL, setPreviewURL] = useState<String | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [model, setModel] = useState<String | null>(null);
  const [description, setDescription] = useState<String | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // UserAuthContext:
  const {user} = useAuthContext();

  // Router:
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Functions:
  const handleButtonClick = () => inputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files;

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile[0]);
      setPreviewURL(imageUrl);
      setFile(selectedFile[0]);
    }
  };

  // On Click ConvertToCOde Button
  const convertToCode = async()=> {
    if(!file || !model){
      console.log("Select all field");
      return;
    }

    setLoading(true);

    const fileName = Date.now() + '.png';
    const imageRef = ref(storage, 'wireframe-to-code/' + fileName);

    await uploadBytes(imageRef, file).then(res => 
      console.log("Image uploaded!")
    );

    const imageUrl = await getDownloadURL(imageRef);
    console.log(imageUrl);

    // Saving Info To DB
    const uid = uuid4(); // Generate Unique id every time
    const result = await axios.post('/api/wireframe-to-code', {
      uid: uid,
      imageUrl: imageUrl,
      model: model,
      description: description,
      email: user?.email,
    });

    setLoading(false);

    router.push(`/view-code/${uid}`);
  }

  return (
    <div className="pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Upload */}
        <div
          className="p-7 border border-gray-300 border-dashed rounded-md shadow-md 
            flex flex-col items-center justify-center"
        >
          {!previewURL ? (
            <>
              <Upload className="size-10 text-[#3b82f6]" />
              <h2 className="font-bold text-lg">Upload Image</h2>

              <p className="text-gray-500 mt-3">Choose Wireframe Image</p>
              {/* Using UseRef for selecting files */}
              <div className="p-5 border border-gray-300 border-dashed w-full flex justify-center mt-7">
                <Button className="bg-[#3b82f6]" onClick={handleButtonClick}>
                  Select Image
                </Button>
              </div>
              <input
                type="file"
                className="hidden"
                multiple={false}
                ref={inputRef}
                onChange={handleFileChange}
              />
            </>
          ) : (
            <div className="relative flex flex-col w-full">
              <X
                className="absolute right-0 bg-gray-400 rounded-full p-0.5 cursor-pointer"
                onClick={()=> setPreviewURL(null)}
              />
              <Image
                src={previewURL}
                alt="preview"
                width={500}
                height={500}
                className="w-full h-[300px] object-contain"
              />
            </div>
          )}
        </div>

        {/* Text Area */}
        <div className="p-7 border shadow-md rounded-lg">
          <h2 className="font-bold text-lg">Select AI Model</h2>
          <Select onValueChange={(value)=> setModel(value)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Model?" />
            </SelectTrigger>
            <SelectContent>
              {
                Constants?.AiModelsList.map((model, index)=>(
                  <SelectItem key={index} value={model.name}>
                    <div className="flex items-center gap-2">
                      <Image src={model.icon} alt={model.name} width={20} height={20} />
                      {model.name}
                    </div>
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>

          <h2 className="font-bold text-lg mt-7">
            Add description to get more desired code
          </h2>
          <Textarea
            onChange={(event)=> setDescription(event?.target.value)}
            className="mt-3 h-[200px]"
            placeholder="Write about your web page"
          />
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center">
        <Button
          className="p-6 bg-gradient-to-l from-blue-500 to-violet-500
          hover:from-violet-500 hover:to-blue-500 hover:shadow-violet-400 transition-all"
          disabled={loading}
          onClick={convertToCode}
        >
          {
            loading ? <Loader2Icon className="animate-spin"/>
            :
            <Sparkles />
          }
          Convert To Code
            
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
