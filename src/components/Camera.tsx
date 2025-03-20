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
  const [isPortrait, setIsPortrait] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      const portrait = window.innerHeight > window.innerWidth;
      setIsMobile(mobile);
      setIsPortrait(portrait);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  useEffect(() => {
    const getDevices = async () => {
      try {
        // First request camera permission by accessing any camera
        await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Then enumerate devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
        
        // Set initial device
        if (videoDevices.length > 0 && !currentDeviceId) {
          setCurrentDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    getDevices();
  }, [currentDeviceId]);

  const switchCamera = () => {
    if (devices.length <= 1) return;
    
    const currentIndex = devices.findIndex(device => device.deviceId === currentDeviceId);
    const nextIndex = (currentIndex + 1) % devices.length;
    setCurrentDeviceId(devices[nextIndex].deviceId);
  };

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
    width: isPortrait ? 720 : 1280,
    height: isPortrait ? 1280 : 720,
    facingMode: isMobile ? "environment" : "user",
    ...(currentDeviceId && { deviceId: { exact: currentDeviceId } }),
    aspectRatio: isPortrait ? 3/4 : 16/9
  } as MediaTrackConstraints;

  return (
    <div className="relative w-full max-w-[95%] sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0">
      <div className={`relative overflow-hidden rounded-lg border-4 border-[#ED1B24] shadow-xl ${
        isPortrait ? 'aspect-[3/4]' : 'aspect-video'
      }`}>
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
        
        {devices.length > 1 && (
          <button
            onClick={switchCamera}
            className="absolute top-2 left-2 bg-[#1B1B75]/90 hover:bg-[#1B1B75] text-white px-3 py-2 rounded-full shadow-lg transition-colors duration-200 flex items-center gap-2"
            title="Switch Camera"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold hidden sm:inline text-white drop-shadow-sm">Switch Camera</span>
          </button>
        )}
      </div>
    </div>
  );
};
