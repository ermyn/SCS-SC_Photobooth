'use client';

import React, { useState, useEffect } from 'react';
import { Camera } from '@/components/Camera';
import { PhotoStrip } from '@/components/PhotoStrip';
import { PreviewRow } from '@/components/PreviewRow';
import Image from 'next/image';

export default function Home() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleCapture = (photo: string) => {
    setPhotos((prev) => [...prev, photo]);
    setIsCapturing(false);
    setCountdown(null);
  };

  const startCapture = () => {
    if (photos.length < 3) {
      setIsCapturing(true);
      setCountdown(3);
    }
  };

  useEffect(() => {
    if (isCapturing && countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCapturing, countdown]);

  const resetPhotos = () => {
    setPhotos([]);
  };

  return (
    <main className="min-h-screen bg-[#bbdcad] flex flex-col items-center justify-between p-2 sm:p-4">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center h-full">
        <div className="text-center mb-4 sm:mb-8">
          <div className="relative w-64 sm:w-80 md:w-96 h-20 sm:h-24 md:h-28 mb-2">
            <Image
              src="/SCS Exhibit_Photostrip1.png"
              alt="SCS Photobooth"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="h-1 w-32 sm:w-48 mx-auto"></div>
        </div>

        {photos.length < 3 ? (
          <div className="w-full flex flex-col items-center justify-between flex-1 py-4">
            <div className="w-full">
              <Camera onCapture={handleCapture} isCapturing={isCapturing} countdown={countdown} />
              <div className="text-center w-full px-4 mt-6">
                <p className="text-base font-medium mb-3">
                  {3 - photos.length} photos remaining
                </p>
                <button
                  onClick={startCapture}
                  disabled={isCapturing}
                  className="w-full bg-[#ED1B24] text-white px-6 py-3 rounded-full hover:bg-[#126CC3] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase font-bold tracking-wide"
                >
                  {isCapturing ? 'Taking Photo...' : 'Take Photo'}
                </button>
              </div>
            </div>
            
            <div className="w-full sm:relative sm:h-[50vh] sm:my-16">
              <div className="mt-12 sm:mt-0">
                <PreviewRow photos={photos} totalSlots={3} />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <PhotoStrip photos={photos} onReset={resetPhotos} />
          </div>
        )}
      </div>
    </main>
  );
};
