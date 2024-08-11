"use client";

import React, { useState } from 'react';

interface ImageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  imageSrc?: string;
  imageAlt?: string;
}

import SearchBar from "./SearchBar";
const baseStr = 'data:image/png;base64,'

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc, imageAlt }) => {

  const [image, setImage] = useState('');

  if (!isOpen) return null;

  async function onSearch(prompt: string) {
    try {
      const response = await fetch(`/api/generation`, {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      console.log(data);
      setImage(baseStr + data.images[0]);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" inset-0 z-30 backdrop-blur-lg backdrop-brightness-10 transition-opacity duration-250 ease opacity-100  h-full absolute top-0 left-0">
      <div className="relative z-40  ">
        <div className="overflow-clip w-full h-[100dvh] relative">
          <div className="h-full w-full z-11 mb-10 ">
            <div className="w-full h-full relative">
              <div className="flex items-center justify-center w-full h-full">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-[896px] h-[1152px] max-h-[100dvh] max-w-[calc(100dvw-1rem-50px)] object-contain transition-transform duration-500 transform scale-100 backdrop-blur-10"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-16 right-[calc(0.4375rem)] z-40">
            <button
              className="bg-black bg-opacity-30 rounded-full p-1 transition-opacity duration-200 ease"
              onClick={onClose}
            >
              <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="absolute top-28 right-6 z-20">
            {/* Scroll Area */}
            <div className="overflow-y-scroll h-[calc(100vh-340px)]">
              <div className="space-y-2">
                <button className="overflow-clip rounded-md">
                  <img src={imageSrc} alt={imageAlt} className="w-24" />
                </button>
                <button className="overflow-clip rounded-md">
                  <img src={imageSrc} alt={imageAlt} className="w-24" />
                </button>
                <button className="overflow-clip rounded-md">
                  <img src={imageSrc} alt={imageAlt} className="w-24" />
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full mt-20 z-30 bg-gradient-to-t from-black to-transparent">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
