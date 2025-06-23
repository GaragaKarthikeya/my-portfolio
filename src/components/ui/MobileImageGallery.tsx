"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';
import { useIsMobile, useHapticFeedback } from '@/hooks/useMobile';

interface MobileImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  initialIndex?: number;
  onClose?: () => void;
}

export default function MobileImageGallery({ 
  images, 
  initialIndex = 0, 
  onClose 
}: MobileImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const isMobile = useIsMobile();
  const { impactLight, impactMedium } = useHapticFeedback();
  const containerRef = useRef<HTMLDivElement>(null);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    impactLight();
  }, [images.length, impactLight]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
    impactLight();
  }, [images.length, impactLight]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevImage();
    } else if (info.offset.x < -threshold) {
      nextImage();
    }
    setDragOffset(0);
  };

  const toggleFullscreen = useCallback(() => {
    if (isMobile && containerRef.current) {
      if (!isFullscreen) {
        containerRef.current.requestFullscreen?.();
        impactMedium();
      } else {
        document.exitFullscreen?.();
        impactLight();
      }
    }
    setIsFullscreen(!isFullscreen);
  }, [isMobile, isFullscreen, impactLight, impactMedium]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          onClose?.();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, prevImage, nextImage, toggleFullscreen]);

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col ${
          isFullscreen ? 'bg-black' : ''
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose?.();
          }
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 text-white safe-area-pt">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isMobile && (
              <button
                onClick={toggleFullscreen}
                className="touch-target p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                <FaExpand className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={onClose}
              className="touch-target p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close gallery"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main image area */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onDrag={(event, info) => setDragOffset(info.offset.x)}
          >
            <div 
              className="relative max-w-full max-h-full"
              style={{ 
                transform: isMobile ? `translateX(${dragOffset * 0.8}px)` : undefined,
                transition: dragOffset === 0 ? 'transform 0.3s ease-out' : 'none'
              }}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Navigation arrows */}
          {!isMobile && images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 touch-target-lg p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous image"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 touch-target-lg p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next image"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Caption and thumbnails */}
        <div className="p-4 text-white safe-area-pb">
          {currentImage.caption && (
            <p className="text-center text-sm mb-4 text-white/80">
              {currentImage.caption}
            </p>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex justify-center space-x-2 overflow-x-auto mobile-scroll">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    impactLight();
                  }}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex 
                      ? 'border-orange-500 scale-110' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Swipe hint for mobile */}
          {isMobile && images.length > 1 && (
            <p className="text-center text-xs text-white/60 mt-2">
              Swipe left or right to navigate
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
