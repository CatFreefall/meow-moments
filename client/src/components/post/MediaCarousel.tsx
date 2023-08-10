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
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-100%", 0, -1],
      scale: 0.25,
    },
    next: {
      shadow: true,
      translate: ["100%", 0, -1],
      scale: 0.25,
    },
  },
};

type MediaCarouselProps = {
  srcURLs: string[];
};

const MediaCarousel = ({ srcURLs }: MediaCarouselProps) => {
  return (
    <Swiper
      {...swiperOptions}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {srcURLs.map((url: string, index: Key) => {
        return (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt="illustration"
              loading="lazy"
              className="w-screen"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MediaCarousel;
