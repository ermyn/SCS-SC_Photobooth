'use client';

import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface CameraProps {
  onCapture: (photo: string) => void;
  isCapturing: boolean;
}

export const Camera: React.FC<CameraProps> = ({ onCapture, isCapturing }) => {
  const webcamRef = useRef<Webcam>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
      }
    }
  }, [onCapture]);

  React.useEffect(() => {
    if (isCapturing) {
      setCountdown(3);
      const intervalId = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(intervalId);
            capture();
            return null;
          }
          return prev ? prev - 1 : null;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isCapturing, capture]);

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative aspect-square overflow-hidden rounded-lg border-8 border-[#ED1B24] shadow-xl">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
        />
        {countdown && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl font-bold text-white drop-shadow-lg">
              {countdown}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
