'use client';

import React from 'react';
import html2canvas from 'html2canvas';

interface PhotoStripProps {
  photos: string[];
}

export const PhotoStrip: React.FC<PhotoStripProps> = ({ photos }) => {
  const photoStripRef = React.useRef<HTMLDivElement>(null);

  const downloadPhotoStrip = async () => {
    if (!photoStripRef.current) return;

    const canvas = await html2canvas(photoStripRef.current, {
      backgroundColor: '#F5F5DC', // Monopoly board color
      scale: 2, // Higher quality
    });

    const link = document.createElement('a');
    link.download = 'monopoly-photobooth.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (photos.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div
        ref={photoStripRef}
        className="bg-[#F5F5DC] p-6 rounded-lg shadow-xl"
      >
        <div className="text-center mb-4">
          <h2 className="text-[#ED1B24] text-2xl font-bold uppercase tracking-wider mb-2">
            Monopoly Photobooth
          </h2>
          <div className="h-1 bg-[#126CC3] w-32 mx-auto"></div>
        </div>

        <div className="space-y-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded border-4 border-[#ED1B24]"
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-auto"
              />
              <div className="absolute bottom-2 right-2 bg-[#008852] text-white px-2 py-1 text-xs rounded">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={downloadPhotoStrip}
            className="bg-[#ED1B24] text-white px-6 py-2 rounded-full hover:bg-[#126CC3] transition-colors duration-200 uppercase font-bold tracking-wide"
          >
            Download Photos
          </button>
        </div>
      </div>
    </div>
  );
};
