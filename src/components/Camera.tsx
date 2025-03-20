'use client';

import React, { useCallback, useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

interface CameraProps {
  onCapture: (photo: string) => void;
  isCapturing: boolean;
  countdown: number | null;
}

export const Camera: React.FC<CameraProps> = ({ onCapture, isCapturing, countdown }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
      }
    }
  }, [onCapture]);

  React.useEffect(() => {
    if (isCapturing && countdown === 0) {
      capture();
    }
  }, [isCapturing, countdown, capture]);

  const videoConstraints = {
    width: isMobile ? 1280 : 1920,
    height: isMobile ? 720 : 1080,
    minWidth: isMobile ? 720 : 1280,
    minHeight: isMobile ? 480 : 720,
    idealWidth: isMobile ? 1280 : 1920,
    idealHeight: isMobile ? 720 : 1080,
    facingMode: "user"
  };

  return (
    <div className="relative w-full max-w-[95%] sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0">
      <div className="relative aspect-video overflow-hidden rounded-lg border-4 border-[#ED1B24] shadow-xl">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
        />
        {countdown && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl sm:text-8xl font-bold text-white drop-shadow-lg">
              {countdown}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
