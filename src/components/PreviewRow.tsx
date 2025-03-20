'use client';

import React from 'react';

interface PreviewRowProps {
  photos: string[];
  totalSlots: number;
}

export const PreviewRow: React.FC<PreviewRowProps> = ({ photos, totalSlots }) => {
  const emptySlots = Array(totalSlots - photos.length).fill(null);
  const allSlots = [...photos, ...emptySlots];

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <div className="flex justify-center gap-6">
        {allSlots.map((photo, index) => (
          <div
            key={index}
            className={`relative w-48 aspect-video overflow-hidden ${
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
