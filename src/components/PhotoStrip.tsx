'use client';

import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

interface PhotoStripProps {
  photos: string[];
  onReset: () => void;
}

export const PhotoStrip: React.FC<PhotoStripProps> = ({ photos, onReset }) => {
  const photoStripRef = React.useRef<HTMLDivElement>(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isBorderVisible, setIsBorderVisible] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const downloadPhotoStrip = async () => {
    if (!photoStripRef.current) return;

    const canvas = await html2canvas(photoStripRef.current, {
      backgroundColor: '#bbdcad',
      scale: 2,
    });

    const link = document.createElement('a');
    link.download = 'monopoly-photobooth.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (photos.length === 0) return null;

  return (
      <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full max-w-[95%] sm:max-w-xl md:max-w-2xl mx-auto">
        <div
          ref={photoStripRef}
          className="relative w-full aspect-[3/4]"
        >
          {/* Content */}
          <div className="relative p-6 sm:p-10">
            <div className="text-center mb-6 sm:mb-8 monopoly-property-card">
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider mb-2 text-[#1B1B75]">
                Photo Strip
              </h2>
              {/* <div className="h-1 bg-[#C41E3A] w-24 sm:w-32 mx-auto"></div> */}
            </div>

            <div className="space-y-6 sm:space-y-8">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden ${
                    isPortrait ? 'aspect-[3/4]' : 'aspect-video'
                  } rounded-lg`}
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-contain"
                    style={{ 
                      objectPosition: 'center',
                      backgroundColor: '#bbdcad'
                    }}
                  />
                  {/* <div className="absolute top-2 right-2 bg-[#1B1B75] text-white px-3 py-1 text-sm rounded-full font-bold">
                    RENT ${(index + 1) * 100}
                  </div> */}
                </div>
              ))}
            </div>
          </div>

          {/* Background Image on Top */}
          <div className="absolute inset-0 w-full h-full z-20 pointer-events-none flex items-center justify-center">
            <Image
              src="/Photostrip_BG.png"
              alt="Photo Strip Border"
              fill
              quality={100}
              className={`select-none transition-opacity duration-300 ${
                isBorderVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                objectFit: 'contain',
                objectPosition: 'center'
              }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Centered Buttons */}
      <div className="max-w-md mx-auto w-full px-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={downloadPhotoStrip}
          className="w-full sm:w-auto bg-[#1B1B75] text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-[#C41E3A] transition-colors duration-200 uppercase font-bold tracking-wide shadow-lg border-2 border-[#F5F5DC] min-w-[200px]"
        >
          Download Photos
        </button>
        <button
          onClick={onReset}
          className="w-full sm:w-auto bg-[#008852] text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-[#126CC3] transition-colors duration-200 uppercase font-bold tracking-wide shadow-lg border-2 border-[#F5F5DC] min-w-[200px]"
        >
          Start Over
        </button>
        <button
          onClick={() => setIsBorderVisible(prev => !prev)}
          className="w-full sm:w-auto bg-[#1B1B75] text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-[#C41E3A] transition-colors duration-200 uppercase font-bold tracking-wide shadow-lg border-2 border-[#F5F5DC] min-w-[200px]"
        >
          {isBorderVisible ? 'Hide Border' : 'Show Border'}
        </button>
      </div>
    </div>
  );
};
