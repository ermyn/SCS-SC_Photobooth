'use client';

import React, { useState, useEffect } from 'react';
import { Camera } from '@/components/Camera';
import { PhotoStrip } from '@/components/PhotoStrip';
import { PreviewRow } from '@/components/PreviewRow';

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
    <main className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-start p-4 md:p-8">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#ED1B24] mb-2">
            SCS Photobooth
          </h1>
          <div className="h-1 bg-[#126CC3] w-48 mx-auto"></div>
        </div>

        {photos.length < 3 ? (
          <div className="w-full flex flex-col items-center space-y-4">
            <Camera onCapture={handleCapture} isCapturing={isCapturing} countdown={countdown} />
            <PreviewRow photos={photos} totalSlots={3} />
            <div className="text-center mt-6">
              <p className="text-lg mb-4">
                {3 - photos.length} photos remaining
              </p>
              <button
                onClick={startCapture}
                disabled={isCapturing}
                className="bg-[#ED1B24] text-white px-8 py-3 rounded-full hover:bg-[#126CC3] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase font-bold tracking-wide"
              >
                {isCapturing ? 'Taking Photo...' : 'Take Photo'}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center space-y-8">
            <PhotoStrip photos={photos} />
            <div className="text-center mt-4">
              <button
                onClick={resetPhotos}
                className="bg-[#008852] text-white px-8 py-3 rounded-full hover:bg-[#126CC3] transition-colors duration-200 uppercase font-bold tracking-wide"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
