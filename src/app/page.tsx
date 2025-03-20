'use client';

import { useState } from 'react';
import { Camera } from '@/components/Camera';
import { PhotoStrip } from '@/components/PhotoStrip';

export default function Home() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = (photo: string) => {
    setPhotos((prev) => [...prev, photo]);
    setIsCapturing(false);
  };

  const startCapture = () => {
    if (photos.length < 3) {
      setIsCapturing(true);
    }
  };

  const resetPhotos = () => {
    setPhotos([]);
  };

  return (
    <main className="min-h-screen bg-[#F5F5DC] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#ED1B24] mb-2">
            Monopoly Photobooth
          </h1>
          <div className="h-1 bg-[#126CC3] w-48 mx-auto"></div>
        </div>

        {photos.length < 3 ? (
          <div className="space-y-6">
            <Camera onCapture={handleCapture} isCapturing={isCapturing} />
            <div className="text-center">
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
          <div className="space-y-6">
            <PhotoStrip photos={photos} />
            <div className="text-center">
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
