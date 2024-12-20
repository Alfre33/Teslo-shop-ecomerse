"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideshow.css";
import React from "react";
import { ProductImageComponent } from "../product-image/ProductImage";

interface Props {
  images: string[];
  title: string;
  className?: string;
}
export const ProductSlideshow = ({ title, className, images }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();
  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 3000,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.length > 0 ? (
          images.map((img) => (
            <SwiperSlide key={img}>
              {" "}
              <ProductImageComponent
                src={img}
                alt={title}
                width={300}
                height={300}
                className="object-fill rounded"
              />{" "}
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide key="default">
            {" "}
            <ProductImageComponent
              src={""}
              alt="Imagen por defecto"
              width={300}
              height={300}
              className="object-fill rounded"
            />{" "}
          </SwiperSlide>
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.length > 0 ? (
          images.map((img) => (
            <SwiperSlide key={img}>
              {" "}
              <ProductImageComponent
                src={img}
                alt={title}
                width={300}
                height={300}
                className="object-fill rounded"
              />{" "}
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide key="default">
            {" "}
            <ProductImageComponent
              src={""}
              alt="Imagen por defecto"
              width={300}
              height={300}
              className="object-fill rounded"
            />{" "}
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};
