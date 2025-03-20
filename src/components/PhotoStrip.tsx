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
    <div className="w-full max-w-lg mx-auto">
      <div
        ref={photoStripRef}
        className="monopoly-double-border bg-[#F5F5DC] p-8"
      >
        <div className="relative p-6">
          {/* Corner Decorations */}
          <div className="monopoly-corner-decoration top-0 left-0"></div>
          <div className="monopoly-corner-decoration top-0 right-0 rotate-90"></div>
          <div className="monopoly-corner-decoration bottom-0 left-0 -rotate-90"></div>
          <div className="monopoly-corner-decoration bottom-0 right-0 rotate-180"></div>

          <div className="text-center mb-6 monopoly-property-card">
            <h2 className="text-[#1B1B75] text-3xl font-bold uppercase tracking-wider mb-2">
              TITLE DEED
            </h2>
            <div className="h-1 bg-[#C41E3A] w-32 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="relative overflow-hidden monopoly-property-card aspect-video"
              >
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#1B1B75] text-white px-3 py-1 text-sm rounded-full font-bold">
                  RENT ${(index + 1) * 100}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={downloadPhotoStrip}
              className="bg-[#1B1B75] text-white px-8 py-3 rounded-lg hover:bg-[#C41E3A] transition-colors duration-200 uppercase font-bold tracking-wide shadow-lg border-2 border-[#F5F5DC]"
            >
              Download Photo Strip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
