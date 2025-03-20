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
    <div className={`w-full max-w-[95%] sm:max-w-xl md:max-w-2xl mx-auto ${
      isPortrait ? 'mt-4' : 'mt-8 sm:mt-12'
    }`}>
      <div className={`flex justify-center items-center gap-4 ${
        isPortrait ? 'flex-col' : 'flex-row'
      }`}>
        {allSlots.map((photo, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${
              isPortrait
                ? 'w-full max-w-[280px] aspect-[3/4]'
                : 'w-full sm:w-40 md:w-48 aspect-video'
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
