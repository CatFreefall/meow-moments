import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types/swiper-options";
import SwiperCore from "swiper";
import { Pagination, EffectCreative } from "swiper/modules";
import { Key } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

SwiperCore.use([Pagination]);
SwiperCore.use([EffectCreative]);

const swiperOptions: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 100,
  pagination: true,
  centeredSlides: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: false,
      translate: ["-100%", 0, -1],
      scale: -0.05,
    },
    next: {
      shadow: false,
      translate: ["100%", 0, -1],
      scale: -0.05,
    },
  },
};

type MediaCarouselProps = {
  srcURLs: string[];
};

const MediaCarousel = ({ srcURLs }: MediaCarouselProps) => {
  return (
    <section className="h-52 p-2">
      <Swiper {...swiperOptions} className="h-full w-full shadow-sm">
        {srcURLs.map((url: string, index: Key) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt="illustration"
                loading="lazy"
                className="object-contain h-full w-full bg-lightlightgrey"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default MediaCarousel;
