'use client';

import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

interface CameraProps {
  onCapture: (photo: string) => void;
  isCapturing: boolean;
  countdown: number | null;
}

export const Camera: React.FC<CameraProps> = ({ onCapture, isCapturing, countdown }) => {
  const webcamRef = useRef<Webcam>(null);

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
    width: 720,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative aspect-square overflow-hidden rounded-lg border-4 border-[#ED1B24] shadow-xl">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
        />
        {countdown && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-bold text-white drop-shadow-lg">
              {countdown}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
