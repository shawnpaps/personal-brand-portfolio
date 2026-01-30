import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    id: string;
    imageUrl: string;
    title: string;
    description?: string;
  }>;
  currentIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black-deep/98 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-rust-orange transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-rust-orange transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-rust-orange transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-12 h-12" />
              </button>
            </>
          )}

          {/* Image Container */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-7xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.imageUrl}
              alt={currentImage.title}
              className="w-full h-full object-contain"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black-deep/90 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentImage.title}
              </h3>
              {currentImage.description && (
                <p className="text-steel-light">{currentImage.description}</p>
              )}
              <p className="text-steel-light text-sm mt-2">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
