import React from 'react';
import { motion } from 'framer-motion';
import { Autoplay, EffectCreative, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

// Filenames carry spaces and colons, so let Vite resolve them at build time.
const photoModules = import.meta.glob('../assets/old event photos/*.jpeg', {
  eager: true,
  query: '?url',
  import: 'default'
});

const PHOTOS = Object.keys(photoModules)
  .sort()
  .map((path, i) => ({ src: photoModules[path], alt: `PenmAI past event photo ${i + 1}` }));

const css = `
  .penmai-gallery {
    width: 100%;
    height: 440px;
    padding-bottom: 50px !important;
  }
  .penmai-gallery .swiper-slide {
    background-position: center;
    background-size: cover;
    border-radius: 25px;
  }
  .penmai-gallery .swiper-pagination-bullet {
    background-color: var(--color-pink) !important;
  }
  @media (max-width: 640px) {
    .penmai-gallery { height: 300px; }
  }
`;

const EventGallery = ({ images = PHOTOS, autoplay = true, showPagination = true, loop = true }) => {
  if (!images.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      style={{ position: 'relative', width: '100%', maxWidth: '896px', margin: '0 auto', padding: '0 20px' }}
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={0}
        autoplay={autoplay ? { delay: 2200, disableOnInteraction: true } : false}
        effect="creative"
        grabCursor={true}
        slidesPerView="auto"
        centeredSlides={true}
        loop={loop}
        pagination={showPagination ? { clickable: true } : false}
        className="penmai-gallery"
        creativeEffect={{
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ['100%', 0, 0] }
        }}
        modules={[EffectCreative, Pagination, Autoplay]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              style={{
                height: '100%',
                width: '100%',
                transform: 'scale(1.05)',
                borderRadius: '24px',
                objectFit: 'cover'
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default EventGallery;
