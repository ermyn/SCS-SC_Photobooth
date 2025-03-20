'use client';

import React, { useState, useEffect } from 'react';

interface PreviewRowProps {
  photos: string[];
  totalSlots: number;
}

export const PreviewRow: React.FC<PreviewRowProps> = ({ photos, totalSlots }) => {
  const [isPortrait, setIsPortrait] = useState(false);

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

  const emptySlots = Array(totalSlots - photos.length).fill(null);
  const allSlots = [...photos, ...emptySlots];

  return (
    <div className="w-full sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
      <div className={`flex justify-center items-center gap-4 sm:gap-8 ${
        isPortrait ? 'flex-col' : 'flex-row'
      }`}>
        {allSlots.map((photo, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${
              isPortrait
                ? 'w-full max-w-[200px] sm:max-w-[280px] aspect-[3/4]'
                : 'w-full sm:w-56 md:w-64 aspect-video'
            } ${
              photo ? 'monopoly-preview-slot' : 'monopoly-preview-slot-empty'
            }`}
          >
            {photo ? (
              <img
                src={photo}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#C41E3A] opacity-50">
                  {index + 1}
                </span>
              </div>
            )}
            <div className="monopoly-preview-number">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
