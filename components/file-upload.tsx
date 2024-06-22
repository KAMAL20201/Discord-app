"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import { Progress } from "./ui/progress";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload = ({ onChange, value }: FileUploadProps) => {
  const [file, setFile] = useState<any>(null);
  const [fileEnter, setFileEnter] = useState(false);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);

  const [loading, setLoading] = useState(false);
  // Get a reference to the storage service, which is used to create references in your storage bucket

  // Create a storage reference from our storage service

  const onUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setLoading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },

      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onChange(downloadURL);
          setLoading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      onUpload(file);
    }
  }, [file]);

  return (
    <div className="container mx-auto min-w-[250px] h-48">
      <div
        className={`${
          fileEnter ? "border-4" : "border-2"
        } mx-auto w-full h-full bg-white px-4 flex flex-col  max-w-xs border-dashed border-indigo-500 items-center justify-center`}
      >
        {!file ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setFileEnter(true);
            }}
            onDragLeave={(e) => {
              setFileEnter(false);
            }}
            onDragEnd={(e) => {
              e.preventDefault();
              setFileEnter(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setFileEnter(false);
              if (e.dataTransfer.items) {
                [...e.dataTransfer.items].forEach((item, i) => {
                  if (item.kind === "file") {
                    const file = item.getAsFile();

                    if (file) {
                      setFile(file);
                    }
                    console.log(`items file[${i}].name = ${file?.name}`);
                  }
                });
              } else {
                [...e.dataTransfer.files].forEach((file, i) => {
                  console.log(`… file[${i}].name = ${file.name}`);
                });
              }
            }}
          >
            <label
              htmlFor="file"
              className="h-full flex flex-col justify-center text-center cursor-pointer text-zinc-500"
            >
              Click to upload or drag and drop
            </label>
            <input
              id="file"
              type="file"
              className="hidden"
              onChange={(e) => {
                let files = e.target.files;
                if (files && files[0]) {
                  setFile(files[0]);
                }
              }}
            />
          </div>
        ) : loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Progress value={imagePercent} max={100} />
          </div>
        ) : value ? (
          <div className="flex flex-col items-center relative w-28 h-28">
            <Image
              className="rounded-[50%]"
              src={value}
              alt="uploaded image"
              fill
            />
            <X
              className=" absolute top-0 right-0 bg-red-500 w-6 h-6 rounded-[50%] p-1 text-white cursor-pointer"
              onClick={() => setFile(null)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FileUpload;
