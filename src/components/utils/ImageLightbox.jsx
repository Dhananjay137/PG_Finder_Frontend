import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ImageLightbox = ({ isOpen, onClose, images, startIndex = 0 }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !images) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-all">
      {/* Close Button */}
      <button 
        className="absolute top-6 right-6 z-[60] p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
        onClick={onClose}
      >
        <X size={30} />
      </button>

      <div className="w-full h-full max-w-6xl max-h-[80vh]">
        <Swiper
          initialSlide={startIndex}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          className="h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center p-4">
              <img
                src={img.fileUrl}
                alt={`View ${index}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
